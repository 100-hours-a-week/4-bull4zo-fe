import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, PencilLine } from 'lucide-react'
import { userKey } from '@/api/services/user/key'
import { UserInfo } from '@/api/services/user/model'
import { useUserLogoutMutation, useUserUpdateMutation } from '@/api/services/user/queries'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/index'
import { ExitUserModal } from '@/components/modal/exitUserModal'
import { NicknameSchema, nicknameSchema } from '@/features/user/lib/userSchema'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore, useUserStore } from '@/stores/index'
import { logoutAndResetStores } from '@/utils/reset'
import { filterAllowedKoreanInput } from '@/utils/validation'

export const UserCard = () => {
  const nickname = useUserStore((s) => s.nickname)
  const setNickName = useUserStore((s) => s.setNickName)
  const openModal = useModalStore((s) => s.openModal)
  const [isEditing, setIsEditing] = useState(false)
  const navigation = useNavigate()

  const queryClient = useQueryClient()

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
  // 유저 닉네임 업데이트
  const { mutate: userUpdate } = useMutation<
    UserInfo,
    unknown,
    { nickname: string },
    { previous: UserInfo | undefined }
  >({
    ...useUserUpdateMutation,
    onMutate: async ({ nickname }) => {
      await queryClient.cancelQueries({ queryKey: userKey() })

      const previous = queryClient.getQueryData<UserInfo>(userKey())
      setNickName(nickname)

      queryClient.setQueryData<UserInfo>(userKey(), (old) => {
        if (!old) return old
        return { ...old, nickname }
      })

      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(userKey(), context.previous)
        setNickName(context?.previous?.nickname)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKey() })
      trackEvent({
        cta_id: 'user_nickname_change',
        action: 'submit',
        page: location.pathname,
      })
    },
  })
  // 유저 로그아웃
  const { mutate: logoutMutate } = useMutation({
    ...useUserLogoutMutation,
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

  const onSubmit = () => {
    setIsEditing(false)
    userUpdate({ nickname: form.getValues('nickname') })
  }

  const logoutHandler = () => {
    logoutMutate()
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
