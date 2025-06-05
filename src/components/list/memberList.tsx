import { GroupMember } from '@/api/services/group/model'

export const MemberList = ({
  members,
  isLoading,
}: {
  members: GroupMember[]
  isLoading: boolean
}) => {
  if (isLoading) return <p>불러오는 중...</p>
  if (members.length === 0) return <p className="text-gray-500">멤버가 없습니다.</p>

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li
          key={member.userId}
          className="px-4 py-2 border rounded-lg shadow-sm bg-white flex items-center"
        >
          <span className="text-sm font-medium">{member.name}</span>
        </li>
      ))}
    </ul>
  )
}
