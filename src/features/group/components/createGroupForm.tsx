// import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Plus } from 'lucide-react'
import { useCreateGroupMutation } from '@/api/services/user/group/quries'
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
import { useModalStore } from '@/stores/modalStore'
import { CreateGroupSchema, createGroupSchema } from '../lib/groupSchema'

export const CreateGroupForm = () => {
  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
    mode: 'onChange',
  })

  const { openModal } = useModalStore()

  const { mutate } = useCreateGroupMutation()

  // const [preview, setPreview] = useState<string | null>(null)
  // const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = (values: CreateGroupSchema) => {
    mutate(
      { name: values.name, description: values.description, imageUrl: '' },
      {
        onSuccess: (data) => {
          openModal(<InviteCodeCheckModal code={data.inviteCode} />)
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col gap-6 w-full h-full max-w-lg mx-auto"
      >
        <div className="gap-6 flex flex-col bg-gray px-5 pt-3 pb-12 rounded-[0.625rem]">
          <div className="flex gap-4">
            {/* <FormField
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
            /> */}
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
                        const onlyLetters = e.target.value.replace(
                          /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9 ]/g,
                          '',
                        )
                        field.onChange(onlyLetters)
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
                  <Label className="text-xs">{field.value.length}/50</Label>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="그룹을 소개해주세요 (최대 50자)"
                    className="resize-none"
                    {...field}
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
