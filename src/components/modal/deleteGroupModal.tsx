import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDeleteGroupMutation } from '@/api/services/group/queries'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index'
import { useModalStore } from '@/stores/index'

export const DeleteGroupModal = ({ groupId }: { groupId: number }) => {
  const route = useNavigate()
  const { closeModal } = useModalStore()

  const { mutateAsync } = useDeleteGroupMutation(groupId)

  const handleSubmit = async () => {
    await mutateAsync()
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
