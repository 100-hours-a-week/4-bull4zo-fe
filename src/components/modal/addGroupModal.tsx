import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { groupNameListKey, myGroupsKey, useInviteCodeMutation } from '@/api/services/group/queries'
import { InviteCodeSchema, inviteCodeSchema } from '@/features/user/lib/userSchema'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/modalStore'
import { filterInviteCode } from '@/utils/validation'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export const AddGroupModal = () => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    ...useInviteCodeMutation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myGroupsKey })
      queryClient.invalidateQueries({ queryKey: groupNameListKey })
    },
  })

  const form = useForm<InviteCodeSchema>({
    resolver: zodResolver(inviteCodeSchema),
    defaultValues: {
      inviteCode: '',
    },
    mode: 'onChange',
  })

  const isValid = form.formState.isValid

  const onNewGroupHandler = () => {
    closeModal()
    navigation(`/group/create`)
  }

  const onSubmit = (values: InviteCodeSchema) => {
    mutate(
      {
        inviteCode: values.inviteCode,
      },
      {
        onSuccess: () => {
          toast('그룹 가입 성공')
          closeModal()
        },
        onSettled: () => {
          trackEvent({
            cta_id: 'group_invite',
            action: 'submit',
            page: location.pathname,
          })
        },
      },
    )
  }

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-2 w-full"
            >
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="초대코드 입력"
                          {...field}
                          maxLength={8}
                          className="flex-1 bg-white rounded-[0.75rem]"
                          onChange={(e) => {
                            field.onChange(filterInviteCode(e.target.value).toUpperCase())
                          }}
                        />
                      </FormControl>
                      <Button
                        disabled={!isValid}
                        type="submit"
                        className={`px-4 ${isValid ? 'bg-primary text-white' : 'bg-gray-400 text-gray-200'}`}
                      >
                        가입
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <Button className="px-7" onClick={onNewGroupHandler}>
            새 그룹 생성
          </Button>
          <Button
            className="px-7"
            onClick={() => {
              closeModal()
            }}
          >
            취소
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
