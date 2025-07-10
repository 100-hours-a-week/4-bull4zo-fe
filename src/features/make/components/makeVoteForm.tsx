import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight } from 'lucide-react'
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/index'
import { VoteCardPreviewModal } from '@/features/make/components/index'
import { trackEvent } from '@/lib/trackEvent'
import { cn } from '@/lib/utils'
import { useGroupStore, useModalStore } from '@/stores/index'
import { getContentLength } from '@/utils/textLength'
import { buildLocalDateTimeString, convertToKstISOString } from '@/utils/time'
import { VoteSchema, voteSchema } from '../lib/makeVoteSchema'

export const MakeVoteForm = () => {
  const { selectedId, setId } = useGroupStore()
  const { openModal } = useModalStore()

  const [fileName, setFileName] = useState<string | null>(null)
  const [minDateTime, setMinDateTime] = useState('')
  const [maxDateTime, setMaxDateTime] = useState('')

  const form = useForm<VoteSchema>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      groupId: selectedId,
      content: '',
      image: undefined,
      closedAt: buildLocalDateTimeString({ days: 1 }),
      anonymous: false,
    },
    mode: 'onChange',
  })

  const onSubmit = () => {
    const data = form.getValues()

    trackEvent({
      cta_id: 'vote_submit_modal',
      action: 'modal',
      page: location.pathname,
    })

    const imageToUse = data.image instanceof File ? data.image : data.image

    openModal(
      <VoteCardPreviewModal
        groupId={data.groupId}
        content={data.content}
        image={imageToUse}
        closedAt={data.closedAt}
        anonymous={data.anonymous}
      />,
    )
  }

  // form에 그룹 id 반영
  useEffect(() => {
    if (selectedId) {
      form.setValue('groupId', selectedId)
    }
  }, [selectedId, form])
  // 선택한 그룹이 "전체"일 경우 "공개"로 자동 변경
  useEffect(() => {
    if (selectedId === 0) setId(1)
  }, [selectedId, setId])
  // 타임 캘린더의 선택 가능을 오늘 + 7일까지로 제한
  useEffect(() => {
    const now = new Date()
    const sevenDaysLater = new Date()
    sevenDaysLater.setDate(now.getDate() + 7)

    const toInputFormat = (date: Date) => {
      return convertToKstISOString(date.toISOString()).slice(0, 16)
    }

    setMinDateTime(toInputFormat(now))
    setMaxDateTime(toInputFormat(sevenDaysLater))
  }, [])

  return (
    <div className="w-full px-5 pt-3 flex items-center justify-center">
      <Form {...form}>
        <form
          className="flex flex-col justify-around h-full gap-4 max-w-[20rem]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel className="font-semibold text-lg">투표 내용</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-[0.875rem] bg-white rounded-[1.25rem] min-w-[20rem] shadow-card h-[18rem] p-4 resize-none border-none shadow-figma"
                    {...field}
                    value={field.value ?? ''}
                    placeholder="내용을 입력하세요."
                    maxLength={100}
                  />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage />
                  <span className="absolute bottom-1 right-1 text-xs text-muted-foreground pr-1">
                    {getContentLength(field.value)}/100
                  </span>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2 ml-3">
                    <Checkbox
                      className="w-5 h-5 bg-white cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <button
                      type="button"
                      className="font-medium cursor-pointer"
                      onClick={() => {
                        field.onChange(!field.value)
                      }}
                    >
                      익명으로 올리기
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const id = 'file-upload'
              return (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">이미지 첨부(선택)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        id={id}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            field.onChange(file)
                            setFileName(file.name)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        className="w-full py-3 h-full text-[1rem] bg-white shadow-md"
                        onClick={() => {
                          const input = document.getElementById(id) as HTMLInputElement | null
                          if (input) {
                            input.click()
                          }
                        }}
                      >
                        <span className="max-w-[250px] truncate">
                          {fileName ? fileName : '이미지 올리기'}
                        </span>
                        {fileName && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()

                              field.onChange(undefined)
                              setFileName(null)
                              const input = document.getElementById(id) as HTMLInputElement | null
                              if (input) input.value = ''
                            }}
                            className="text-sm pl-1 pr-4 text-muted-foreground hover:text-red-500 cursor-pointer"
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
          />
          <FormField
            control={form.control}
            name="closedAt"
            render={({ field }) => (
              <FormItem className=" relative">
                <FormLabel className="font-semibold text-lg">투표 종료 시간</FormLabel>
                <FormControl>
                  <input
                    className="rounded-[0.75rem] bg-gray px-8 py-3 shadow-md focus:ring-1 focus:outline-none cursor-pointer"
                    {...field}
                    style={{ backgroundColor: 'white' }}
                    type="datetime-local"
                    min={minDateTime}
                    max={maxDateTime}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full items-center flex justify-end">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className={cn(
                `w-full h-full max-w-[6rem] py-2 text-lg font-medium mt-4 `,
                form.formState.isValid ? 'bg-primary text-white' : 'bg-gray-300',
              )}
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
