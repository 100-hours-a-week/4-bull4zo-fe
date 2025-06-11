import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { axiosInstance } from '@/api/axios'
import { Group } from '@/api/services/group/model'
import { useUpdateGroupMutation } from '@/api/services/group/queries'
import { DeleteGroupModal } from '@/components/modal/deleteGroupModal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { trackEvent } from '@/lib/trackEvent'
import { cn } from '@/lib/utils'
import { useModalStore } from '@/stores/modalStore'
import { ableManage, ableOwner } from '@/utils/authority'
import { getContentLength } from '@/utils/textLength'
import { filterAllowedKoreanInput } from '@/utils/validation'
import { UpdateGroupSchema, updateGroupSchema } from '../lib/groupSchema'

interface Props {
  group: Group
}

export const UpdateGroupForm = ({ group }: Props) => {
  const { groupId } = useParams()
  const { openModal } = useModalStore()

  const form = useForm<UpdateGroupSchema>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      changeInviteCode: false,
    },
    mode: 'onChange',
  })

  const { mutateAsync: updateGroup } = useUpdateGroupMutation(Number(groupId))

  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (values: UpdateGroupSchema) => {
    try {
      const image = form.getValues('image')
      let imageUrl = preview ?? ''

      if (image && image instanceof FileList && image.length > 0) {
        const file = image[0]

        // 1. presigned URL 요청
        const { data: presignedRes } = await axiosInstance.post('/api/v1/image/presigned-url', {
          fileName: file.name,
        })
        if (presignedRes.message !== 'SUCCESS') {
          throw new Error('Presigned URL 발급 실패')
        }
        const { uploadUrl, fileUrl } = presignedRes.data

        // 2. 이미지 업로드 (PUT)
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        })

        if (!uploadRes.ok) {
          toast.error('이미지 업로드에 실패했습니다.')
        }

        imageUrl = fileUrl
      }
      await updateGroup(
        { name: values.name, description: values.description, imageUrl },
        {
          onSuccess: () => {
            toast.success('그룹 정보가 성공적으로 업데이트되었습니다.')
          },
        },
      )
    } catch (err) {
      const errorObject = err as {
        message: string
      }
      toast.error(errorObject.message || '그룹 정보 업데이트에 실패했습니다.')
    } finally {
      trackEvent({
        cta_id: 'group_create',
        action: 'submit',
        page: location.pathname,
      })
    }
  }

  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        description: group.description,
      })
    }
    if (group?.imageUrl) {
      setPreview(group.imageUrl)
    }
  }, [group, form])

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">그룹 정보</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-4 w-full max-w-lg mx-auto"
        >
          <div className="gap-6 flex flex-col bg-white shadow-md px-5 pt-3 pb-6 rounded-[0.625rem]">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">그룹 이미지</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setPreview(URL.createObjectURL(file))
                              field.onChange(e.target.files)
                            }
                          }}
                        />
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-24 h-24 border rounded-[1rem] bg-gray-200 overflow-hidden cursor-pointer flex items-center justify-center relative"
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="미리보기"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <Plus className="w-8 h-8 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="max-w-24" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 gap-4 pt-7 min-h-[10rem]">
                    <FormLabel className="font-semibold text-lg">그룹 이름</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          !ableManage(group?.role) &&
                            '!ring-0 !focus:ring-0 !focus-visible:ring-0 !outline-none !border-gray-400',
                        )}
                        placeholder="그룹 이름을 입력하세요"
                        readOnly={!ableManage(group?.role)}
                        {...field}
                        onChange={(e) => {
                          field.onChange(filterAllowedKoreanInput(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-semibold text-lg">그룹 소개</FormLabel>
                    {ableManage(group?.role) && (
                      <Label className="text-xs">{getContentLength(field.value)}/50</Label>
                    )}
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="그룹을 소개해주세요 (최대 50자)"
                      className={cn(
                        'resize-none',
                        !ableManage(group?.role) && 'focus-visible:ring-0 border-gray-400',
                      )}
                      {...field}
                      maxLength={50}
                      readOnly={!ableManage(group?.role)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="changeInviteCode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-semibold text-lg">초대 코드</FormLabel>
                  </div>
                  <FormControl>
                    <div className="flex flex-row items-center justify-between">
                      <p>{group?.inviteCode}</p>
                      {ableManage(group?.role) && (
                        <TooltipProvider>
                          <Tooltip open={field.value} onOpenChange={() => {}}>
                            <TooltipTrigger asChild>
                              <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => field.onChange(!field.value)}
                              >
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="cursor-pointer"
                                />
                                <span className="text-sm">재생성</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              align="end"
                              sideOffset={8} // ← 상단 여백 조절
                              className="text-black text-xs px-3 py-1.5 rounded-md shadow-md relative"
                            >
                              <p>
                                초대 코드 재생성 시, <br className="sm:hidden" /> 기존 멤버는
                                변경되지 않습니다.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {ableManage(group?.role) && (
            <div className="flex justify-center items-center">
              <Button
                className={`py-1 h-full text-lg ${form.formState.isValid && 'bg-primary text-white'}`}
                type="submit"
                disabled={!form.formState.isValid}
              >
                변경사항 저장
              </Button>
            </div>
          )}
          {ableOwner(group?.role) && (
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="text-sm underline text-gray cursor-pointer"
                disabled={!form.formState.isValid}
                onClick={() => {
                  openModal(<DeleteGroupModal groupId={Number(groupId)} />)
                }}
              >
                그룹 삭제
              </button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
