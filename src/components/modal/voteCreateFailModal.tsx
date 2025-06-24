import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDeleteVoteMutation, useVoteReportReasons } from '@/api/services/vote/queries'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index'
import { voteCreateFailMessage } from '@/lib/messageMap'
import { useModalStore } from '@/stores/modalStore'

export const VoteCreateFailModal = ({ voteId }: { voteId: number }) => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const { data } = useVoteReportReasons(voteId.toString())
  const { mutateAsync } = useDeleteVoteMutation(voteId.toString())

  const reason = (data?.reviewReason || 'OTHER') as keyof typeof voteCreateFailMessage

  const handleDeleteVote = async () => {
    await mutateAsync()
    toast.success('투표가 삭제되었어요.')
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
            투표 생성에 실패했어요.
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div className="text-[0.875rem]">
          <p className="text-center max-w-[20ch]">현재 투표는 {voteCreateFailMessage[reason]}</p>
        </div>
        <div className="w-full flex justify-around">
          <Button
            className="px-7"
            onClick={() => {
              navigation(`/make/${voteId}`)
              closeModal()
            }}
          >
            다시 만들기
          </Button>
          <Button className="px-5" onClick={handleDeleteVote}>
            삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
