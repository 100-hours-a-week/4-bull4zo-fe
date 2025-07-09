import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { groupNameListKey, myGroupsKey } from '@/api/services/group/key'
import { useDeleteGroupMutation } from '@/api/services/group/queries'
import { useModalStore } from '@/stores/modalStore'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const DeleteGroupModal = ({ groupId }: { groupId: number }) => {
  const route = useNavigate()
  const { closeModal } = useModalStore()

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    ...useDeleteGroupMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myGroupsKey() })
      queryClient.invalidateQueries({ queryKey: groupNameListKey() })
    },
  })

  const handleSubmit = async () => {
    await mutateAsync(groupId)
    toast.success('그룹이 삭제되었습니다.')
    route('/user')
    closeModal()
  }

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl text-center">
            그룹을 삭제하시겠습니까?
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div className="text-[0.875rem] text-center">
          <p>그룹 내의 모든 투표가 사라지며,</p>
          <p>복구할 수 없습니다.</p>
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
          <Button className="px-5" onClick={handleSubmit}>
            삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
