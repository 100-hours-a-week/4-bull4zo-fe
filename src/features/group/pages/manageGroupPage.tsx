import { useParams } from 'react-router-dom'
import { useGroupQuery } from '@/api/services/group/queries'
import NotFoundPage from '@/app/NotFound'
import { GroupMember } from '../components/groupMember'
import { GroupReport } from '../components/groupReport'
import { UpdateGroupForm } from '../components/updateGroupForm'

const ManageGroupPage = () => {
  const { groupId } = useParams()
  const { data: group } = useGroupQuery(Number(groupId))

  if (!group) {
    return <NotFoundPage />
  }

  return (
    <article className="px-5 py-5 min-h-full">
      <UpdateGroupForm group={group} />
      <div className="w-[450px] my-3 bg-gray h-[0.625rem] transform -translate-x-5" />
      <GroupReport group={group} />
      <div className="w-[450px] my-3 bg-gray h-[0.625rem] transform -translate-x-5" />
      <GroupMember />
    </article>
  )
}
export default ManageGroupPage
