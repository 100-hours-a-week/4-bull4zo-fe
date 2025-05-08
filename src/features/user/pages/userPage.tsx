import { UserCard } from '@/features/user/components/userCard'
import { UserGroupList } from '../components/userGroupList'

const UserPage = () => {
  return (
    <article className="px-7 py-5">
      <UserCard />
      <UserGroupList />
    </article>
  )
}
export default UserPage
