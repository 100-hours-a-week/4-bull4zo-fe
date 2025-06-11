import { useForm } from 'react-hook-form'
import { TbSend2 } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import { CommentCreateRequest } from '@/api/services/comment/model'
import { useCreateCommentMutation } from '@/api/services/comment/queries'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export const CommentInput = () => {
  const { voteId } = useParams()

  const form = useForm<CommentCreateRequest>({
    defaultValues: {
      content: '',
      anonymous: true,
    },
  })

  const { mutateAsync } = useCreateCommentMutation(Number(voteId))

  const onSubmit = async (values: CommentCreateRequest) => {
    await mutateAsync(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form className="rounded-4xl flex flex-row gap-2 px-4 py-1 mx-4 border bg-white">
        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="cursor-pointer">
              <FormControl>
                <div className="flex gap-1 items-center justify-center">
                  <Checkbox
                    className="w-4 h-4 cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span onClick={() => field.onChange(!field.value)} className="text-xs">
                    {field.value ? '익명' : '실명'}
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  className="w-full bg-transparent resize-none border-none shadow-none overflow-y-auto leading-[1.5]
                  min-h-[1lh] max-h-[5lh] focus-visible:ring-0 py-1 sm:py-2"
                  placeholder="댓글을 입력해주세요."
                  {...field}
                  onKeyDown={(e) => {
                    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

                    if (!isMobile && e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          <Button
            type="button"
            className="w-8 h-8 p-0 flex items-center justify-center bg-inline shadow-none"
            onClick={form.handleSubmit(onSubmit)}
          >
            <TbSend2 size={24} />
          </Button>
        </div>
      </form>
    </Form>
  )
}
