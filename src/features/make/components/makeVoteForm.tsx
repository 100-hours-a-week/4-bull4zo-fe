import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import { Modal } from '@/components/modal/modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { VoteCardPreviewModal } from '@/features/make/components/voteCardPreviewModal'
import { convertGlobalTime2LocalTime } from '@/lib/globalTime2LocalTime'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { VoteSchema, voteSchema } from '../lib/makeVoteSchema'

export const MakeVoteForm = () => {
  const { selectedId } = useGroupStore()
  const { isOpen, openModal } = useModalStore()

  const form = useForm<VoteSchema>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      groupId: selectedId,
      content: '',
      image: undefined,
      closedAt: convertGlobalTime2LocalTime({ days: 1 }),
    },
    mode: 'onChange',
  })

  const onSubmit = () => {
    const groupId = form.getValues('groupId')
    const content = form.getValues('content')
    const image = form.getValues('image')
    const closedAt = form.getValues('closedAt')

    openModal(
      <VoteCardPreviewModal
        groupId={groupId}
        content={content}
        image={image}
        closedAt={closedAt}
      />,
    )
  }

  useEffect(() => {
    if (selectedId) {
      form.setValue('groupId', selectedId)
    }
  }, [selectedId, form])

  if (isOpen) {
    return <Modal />
  }

  return (
    <div className="h-[90%] w-full px-5">
      <Form {...form}>
        <form
          className="flex flex-col justify-around h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel className="font-semibold">투표 내용</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-0 bg-primary rounded-[1.25rem] min-w-[20rem] shadow-card h-[18rem] p-4 resize-none"
                    {...field}
                    value={field.value ?? ''}
                    placeholder="내용을 입력하세요."
                    maxLength={256}
                  />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage />
                  <span className="absolute bottom-1 right-1 text-xs text-muted-foreground pr-1">
                    {field.value?.length || 0}/255
                  </span>
                </div>
              </FormItem>
            )}
          />
          {/*
          v2 이미지 저장 로직 추가 후 반영
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const id = 'file-upload'
              return (
                <FormItem>
                  <FormLabel className="font-semibold">이미지 첨부(선택)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={id}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            field.onChange(file)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        className="w-full py-3 h-full text-[1rem]"
                        onClick={() => {
                          const input = document.getElementById(id) as HTMLInputElement | null
                          if (input) {
                            input.click()
                          }
                        }}
                      >
                        <span>
                          {field.value
                            ? field.value.name.replace(/\.[^/.]+$/, '')
                            : '이미지 올리기'}
                        </span>
                        {field.value && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()

                              setTimeout(() => {
                                field.onChange(undefined)
                                const input = document.getElementById(id) as HTMLInputElement | null

                                if (input) {
                                  input.value = ''
                                }
                              }, 0)
                            }}
                            className="ml-2 text-sm text-muted-foreground hover:text-red-500 cursor-pointer"
                          >
                            ✕
                          </span>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          /> */}
          <FormField
            control={form.control}
            name="closedAt"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel className="font-semibold">투표 종료 시간</FormLabel>
                <FormControl>
                  <input
                    className="text-xl rounded-[0.75rem] bg-gray px-8 py-3"
                    {...field}
                    type="datetime-local"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full items-center flex justify-end">
            <Button
              type="submit"
              className="w-full h-full max-w-[6rem] py-1 text-lg font-semibold mt-4"
            >
              등록
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
