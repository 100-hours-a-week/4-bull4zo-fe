import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, PencilLine } from 'lucide-react'
import { useUserLogoutMutation, useUserUpdateMutation } from '@/api/services/user/quries'
import { ExitUserModal } from '@/components/modal/exitUserModal'
import { NicknameSchema, nicknameSchema } from '@/features/user/lib/userSchema'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'

export const UserCard = () => {
  const { nickname, setNickName, logout } = useUserStore()
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

  const { mutate: userUpdate } = useUserUpdateMutation()
  const { mutate: logoutMutate } = useUserLogoutMutation()

  const onSubmit = (data: { nickname: string }) => {
    console.log('변경된 닉네임:', data.nickname)
    setIsEditing(false)
    userUpdate(
      { nickname: form.getValues('nickname') },
      {
        onSuccess: (data) => {
          setNickName(data.nickname)
        },
      },
    )
  }

  const logoutHandler = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        logout()
        navigation('/login')
      },
    })
  }

  return (
    <Card className="px-5 py-5 w-full bg-primary text-black rounded-2xl shadow-box border-2">
      <CardHeader className="px-4">
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`flex flex-row justify-between items-center w-full px-2 py-2 rounded gap-2`}
            >
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="w-full text-2xl font-unbounded"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              form.handleSubmit(onSubmit)()
                            }
                          }}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(/[^a-zA-Z가-힣]/g, '')
                            field.onChange(onlyLetters)
                          }}
                        />
                        <Check
                          onClick={() => form.handleSubmit(onSubmit)()}
                          className="absolute top-2 right-2 cursor-pointer w-5 h-5 shrink-0"
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
          <div className="flex justify-between items-center w-full py-[0.675rem]">
            <CardTitle className="font-unbounded text-2xl">{nickname}</CardTitle>
            <PencilLine onClick={() => setIsEditing(true)} className="cursor-pointer w-5 h-5" />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex justify-end items-center h-full gap-2 px-4">
        <Button onClick={() => logoutHandler()} className="bg-emerald-400 text-white">
          로그아웃
        </Button>
        <Button onClick={() => openModal(<ExitUserModal />)} className="bg-red-400 text-white">
          회원탈퇴
        </Button>
      </CardContent>
    </Card>
  )
}
