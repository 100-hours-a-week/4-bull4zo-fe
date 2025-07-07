import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { authAxiosInstance } from '@/api/axios'
import { groupNameListKey, myGroupsKey, useCreateGroupMutation } from '@/api/services/group/queries'
import { InviteCodeCheckModal } from '@/components/modal/inviteCodeCheckModal'
import { Button } from '@/components/ui/button'
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
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/modalStore'
import { getContentLength } from '@/utils/textLength'
import { filterAllowedKoreanInput } from '@/utils/validation'
import { CreateGroupSchema, createGroupSchema } from '../../lib/groupSchema'

export const CreateGroupForm = () => {
  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
    mode: 'onChange',
  })

  const { openModal } = useModalStore()

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    ...useCreateGroupMutation,
  })

  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (values: CreateGroupSchema) => {
    try {
      const image = form.getValues('image')
      let imageUrl = ''
      let imageName = ''

      if (image) {
        // 1. presigned URL 요청
        const { data: presignedRes } = await authAxiosInstance.post('/api/v1/image/presigned-url', {
          fileName: image.name,
        })
        if (presignedRes.message !== 'SUCCESS') {
          throw new Error('Presigned URL 발급 실패')
        }
        const { uploadUrl, fileUrl } = presignedRes.data

        // 2. 이미지 업로드 (PUT)
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': image.type,
          },
          body: image,
        })

        if (!uploadRes.ok) {
          toast.error('이미지 업로드에 실패했습니다.')
        }

        imageUrl = fileUrl
        imageName = image.name
      }
      await mutateAsync(
        { name: values.name, description: values.description, imageUrl, imageName },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: myGroupsKey })
            queryClient.invalidateQueries({ queryKey: groupNameListKey })
            openModal(<InviteCodeCheckModal code={data.inviteCode} />)
          },
          onSettled: () => {
            trackEvent({
              cta_id: 'group_create',
              action: 'submit',
              page: location.pathname,
            })
          },
        },
      )
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // const errorObject = err as {
      //   message: string
      // }
      // toast.error(errorObject.message || '그룹 생성에 실패했습니다.')
    } finally {
      trackEvent({
        cta_id: 'group_create',
        action: 'submit',
        page: location.pathname,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col gap-6 w-full h-full max-w-lg mx-auto"
      >
        <div className="gap-6 flex flex-col bg-white shadow-md px-5 pt-3 pb-12 rounded-[0.625rem]">
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
                        accept="image/png, image/jpeg, image/jpg"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setPreview(URL.createObjectURL(file))
                            field.onChange(file)
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
                      placeholder="그룹 이름을 입력하세요"
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
                  <Label className="text-xs">{getContentLength(field.value)}/50</Label>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="그룹을 소개해주세요 (최대 50자)"
                    className="resize-none"
                    {...field}
                    maxLength={50}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            className={`py-4 px-14 h-full text-lg ${form.formState.isValid && 'bg-primary text-white'}`}
            type="submit"
            disabled={!form.formState.isValid}
          >
            그룹 생성
          </Button>
        </div>
      </form>
    </Form>
  )
}
