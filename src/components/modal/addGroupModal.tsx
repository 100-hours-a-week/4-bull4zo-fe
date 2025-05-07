import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useInviteCodeMutation } from '@/api/services/user/group/quries'
import { InviteCodeSchema, inviteCodeSchema } from '@/features/user/lib/userSchema'
import { useModalStore } from '@/stores/modalStore'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export const AddGroupModal = () => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const { mutate } = useInviteCodeMutation()

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
    navigation(`/user/group/create`)
  }

  const onSubmit = (values: InviteCodeSchema) => {
    mutate(
      {
        inviteCode: values.inviteCode,
      },
      {
        onSuccess: () => {
          toast('그룹 가입 성공')
        },
      },
    )
    closeModal()
  }

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl text-center">초대코드 입력</CardTitle>
        </div>
      </CardHeader>
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
                            field.onChange(e.target.value.toUpperCase().replace(/\s/g, ''))
                          }}
                        />
                      </FormControl>
                      <Button
                        disabled={!isValid}
                        type="submit"
                        className={`px-4 ${isValid ? 'bg-primary text-white' : 'bg-gray-400 text-gray-200'}`}
                      >
                        전송
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="w-full flex justify-around">
          <Button
            className="px-7"
            onClick={() => {
              closeModal()
            }}
          >
            취소
          </Button>
          <Button className="px-7" onClick={onNewGroupHandler}>
            새 그룹 생성
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
