import { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { GroupMember, GroupRole } from '@/api/services/group/model'
import {
  useGroupMemberDeleteMutation,
  useGroupQuery,
  useGroupRoleChangeMutation,
} from '@/api/services/group/queries'
import { ableManage } from '@/utils/authority'

interface Props {
  members: GroupMember[]
  isLoading: boolean
}

export const MemberList = ({ members, isLoading }: Props) => {
  const { groupId } = useParams()
  const { data: group } = useGroupQuery(Number(groupId))

  if (isLoading) return
  if (members.length === 0) return <p className="text-gray-500">멤버가 없습니다.</p>

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li
          key={member.userId}
          className="px-4 py-3 flex flex-row items-center border-b border-gray-300 justify-between"
        >
          <span className="text-sm font-medium">{member.nickname}</span>
          {ableManage(group?.role) && (
            <MemberRoleLabel groupId={Number(groupId)} member={member} myRole={group?.role!} />
          )}
        </li>
      ))}
    </ul>
  )
}

export const MemberRoleLabel = ({
  groupId,
  member,
  myRole,
}: {
  groupId: number
  member: GroupMember
  myRole: GroupRole
}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { mutateAsync: changeRole } = useGroupRoleChangeMutation(groupId, member.userId)
  const { mutateAsync: leaveGroup } = useGroupMemberDeleteMutation(groupId, member.userId)

  const toggleDropdown = () => setOpen((prev) => !prev)
  const text = member.role === 'OWNER' ? '소유자' : member.role === 'MANAGER' ? '관리자' : '멤버'

  const handleRoleChange = async (role: GroupRole | 'LEAVE') => {
    if (role === 'LEAVE') {
      await leaveGroup()
    } else {
      await changeRole({ role })
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const roleOptions: { key: GroupRole | 'LEAVE'; label: string }[] = (() => {
    if (myRole === 'OWNER') {
      return [
        { key: 'OWNER', label: '소유자로 변경' },
        { key: 'MANAGER', label: '관리자로 변경' },
        { key: 'MEMBER', label: '멤버로 변경' },
        { key: 'LEAVE', label: '그룹에서 추방' },
      ]
    }

    if (myRole === 'MANAGER') {
      if (member.role === 'MEMBER') {
        return [
          { key: 'MANAGER', label: '관리자로 변경' },
          { key: 'LEAVE', label: '그룹에서 추방' },
        ]
      }
      return []
    }

    return []
  })()

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 cursor-pointer text-sm px-2 py-1 rounded-full"
        onClick={toggleDropdown}
      >
        <span>{text}</span>
        {roleOptions.length > 0 && <FaChevronDown className="w-3 h-3" />}
      </div>

      {open && roleOptions.length > 0 && (
        <div className="absolute mt-2 right-2 top-5 shadow-md w-32 bg-white border-gray-300 rounded-md z-10 rounded-tl-2xl rounded-b-2xl overflow-hidden">
          {roleOptions.map((item) => (
            <div key={item.key}>
              {item.key === 'LEAVE' && <hr className="border-t border-gray-200 my-1" />}
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  handleRoleChange(item.key)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
