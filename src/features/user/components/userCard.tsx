import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, PencilLine } from 'lucide-react'
import { useUserLogoutMutation, useUserUpdateMutation } from '@/api/services/user/queries'
import { ExitUserModal } from '@/components/modal/exitUserModal'
import { NicknameSchema, nicknameSchema } from '@/features/user/lib/userSchema'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { logoutAndResetStores } from '@/utils/reset'
import { filterAllowedKoreanInput } from '@/utils/validation'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'

export const UserCard = () => {
  const { nickname, setNickName } = useUserStore()
  const { openModal } = useModalStore()
  const [isEditing, setIsEditing] = useState(false)
  const navigation = useNavigate()

  const form = useForm<NicknameSchema>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (nickname) {
      form.setValue('nickname', nickname)
    }
  }, [nickname, form])

  const { mutate: userUpdate } = useUserUpdateMutation()
  const { mutate: logoutMutate } = useUserLogoutMutation()

  const onSubmit = () => {
    setIsEditing(false)
    userUpdate(
      { nickname: form.getValues('nickname') },
      {
        onSuccess: (data) => {
          setNickName(data.nickname)
        },
        onSettled: () => {
          trackEvent({
            cta_id: 'user_nickname_change',
            action: 'submit',
            page: location.pathname,
          })
        },
      },
    )
  }

  const logoutHandler = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        logoutAndResetStores()
        navigation('/login')
      },
      onSettled: () => {
        trackEvent({
          cta_id: 'logout_click',
          action: 'click',
          page: location.pathname,
        })
      },
    })
  }

  return (
    <Card className="relative px-5 py-6 w-full bg-primary-gradient-down-right text-black rounded-4xl shadow-md border-none h-40 gap-[2.5rem]">
      <CardHeader className="px-4 relative h-full">
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="absolute top-1 left-1 right-6 flex flex-row justify-between items-center w-auto gap-2"
            >
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative text-2xl">
                        <Input
                          {...field}
                          className="w-[calc(100%+20px)] h-14 font-pyeojinGothic font-bold"
                          style={{ fontSize: '1.125rem' }}
                          autoFocus
                          maxLength={18}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              form.handleSubmit(onSubmit)()
                            }
                          }}
                          onChange={(e) => {
                            field.onChange(filterAllowedKoreanInput(e.target.value))
                          }}
                        />
                        <Check
                          onClick={() => form.handleSubmit(onSubmit)()}
                          className="absolute top-4 right-0 cursor-pointer w-6 h-6 shrink-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <CardTitle className="font-pyeojinGothic font-bold text-[1.25rem]">
              {nickname}
            </CardTitle>
            <PencilLine onClick={() => setIsEditing(true)} className="cursor-pointer w-5 h-5" />
          </div>
        )}
      </CardHeader>
      <CardContent
        className="flex gap-2 items-end justify-between text-xs"
        style={{ padding: '0', paddingLeft: '12px' }}
      >
        <span onClick={() => openModal(<ExitUserModal />)} className="underline cursor-pointer">
          회원탈퇴를 원하시나요?
        </span>
        <Button
          onClick={() => logoutHandler()}
          className="bg-red-400 text-white rounded-[1.875rem]"
        >
          로그아웃
        </Button>
      </CardContent>
    </Card>
  )
}
