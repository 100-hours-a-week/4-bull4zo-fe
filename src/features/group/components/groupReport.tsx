import { useNavigate, useParams } from 'react-router-dom'
import { Group } from '@/api/services/group/model'
import { Button } from '@/components/ui/button'
import { ableManage } from '@/utils/authority'

interface Props {
  group: Group
}

export const GroupReport = ({ group }: Props) => {
  const { groupId } = useParams()

  const route = useNavigate()
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold mb-4">그룹 리포트</h1>
      <Button className="h-full w-full bg-white text-lg py-3 shadow-md cursor-pointer">
        그룹 내 리포트 확인하기
      </Button>
      {ableManage(group.role) && (
        <Button
          onClick={() => route(`/group/${groupId}/votes`)}
          className="mt-4 h-full w-full bg-white text-lg py-3 shadow-md cursor-pointer"
        >
          그룹 내 투표 목록 확인하기
        </Button>
      )}
    </div>
  )
}
