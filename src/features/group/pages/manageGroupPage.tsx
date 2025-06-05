import { GroupMember } from '../components/groupMember'
import { GroupReport } from '../components/groupReport'
import { UpdateGroupForm } from '../components/updateGroupForm'

const ManageGroupPage = () => {
  return (
    <article className="px-5 py-5 min-h-full">
      <UpdateGroupForm />
      <div className="w-[450px] my-3 bg-gray h-[0.625rem] transform -translate-x-5" />
      <GroupReport />
      <div className="w-[450px] my-3 bg-gray h-[0.625rem] transform -translate-x-5" />
      <GroupMember />
    </article>
  )
}
export default ManageGroupPage
