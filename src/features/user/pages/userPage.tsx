import { useRef } from 'react'
import { UserGroupList } from '@/components/list/userGroupList'
import { UserCard } from '@/features/user/components/userCard'
import { UserFeedbackWidget } from '../components/userFeedbackWidget'

const UserPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <article ref={containerRef} className="px-7 py-5">
      <UserCard />
      <UserGroupList />
      <UserFeedbackWidget />
    </article>
  )
}
export default UserPage
