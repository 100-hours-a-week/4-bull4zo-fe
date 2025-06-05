import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const GroupReport = () => {
  const { groupId } = useParams()

  const route = useNavigate()
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">그룹 리포트</h1>
      <Button className="h-full w-full bg-white text-lg py-3 shadow-md cursor-pointer">
        그룹 내 리포트 확인하기
      </Button>
      <Button
        onClick={() => route(`/group/${groupId}/votes`)}
        className="mt-4 h-full w-full bg-white text-lg py-3 shadow-md cursor-pointer"
      >
        그룹 내 투표 목록 확인하기
      </Button>
    </div>
  )
}
