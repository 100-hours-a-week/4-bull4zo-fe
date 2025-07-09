import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useUserDeleteMutation } from '@/api/services/user/queries'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/index'
import { logoutAndResetStores } from '@/utils/reset'

export const ExitUserModal = () => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const { mutate: deleteUserMutate } = useMutation({
    ...useUserDeleteMutation,
    onSuccess: () => {
      logoutAndResetStores()
      navigation(`/login`)
    },
    onSettled: () => {
      trackEvent({
        cta_id: 'user_delete',
        action: 'click',
        page: location.pathname,
      })
    },
  })

  const deleteHandler = () => {
    deleteUserMutate()
  }

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl text-center">
            회원 탈퇴 하시겠습니까?
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-around">
          <Button
            className="px-7"
            onClick={() => {
              closeModal()
            }}
          >
            취소
          </Button>
          <Button className="px-7" onClick={deleteHandler}>
            탈퇴
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
