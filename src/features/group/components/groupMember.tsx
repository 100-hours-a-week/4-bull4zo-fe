import { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useGroupMembersQuery } from '@/api/services/group/queries'
import { MemberList } from '@/components/list/memberList'
import { Input } from '@/components/ui/input'

export const GroupMember = () => {
  const { groupId } = useParams()
  const { data } = useGroupMembersQuery(Number(groupId))

  const [search, setSearch] = useState('')

  const filteredMembers = useMemo(() => {
    return (
      data?.members?.filter((member) =>
        member.nickname.toLowerCase().includes(search.toLowerCase()),
      ) ?? []
    )
  }, [data, search])

  return (
    <div className="min-h-[80svh] px-5">
      <h1 className="text-2xl font-bold mb-4">멤버 목록</h1>
      <MemberSearchBar search={search} onChange={setSearch} />
      <MemberList members={filteredMembers} isLoading={!data} />
    </div>
  )
}

const MemberSearchBar = ({
  search,
  onChange,
}: {
  search: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}) => {
  return (
    <div className="mb-4 flex flex-row items-center bg-white gap-1 px-3 py-1.5 shadow-md rounded-2xl">
      <FaSearch />
      <Input
        placeholder="멤버 닉네임 검색"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none outline-none focus-visible:ring-0 shadow-none"
      />
    </div>
  )
}
