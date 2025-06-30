import { Suspense, useRef } from 'react'
import { UserGroupList } from '@/components/list/userGroupList'
import { LoadingPage } from '@/components/loading/loadingPage'
import { UserCard } from '@/features/user/components/userCard'
import { UserFeedbackWidget } from '../components/userFeedbackWidget'

const UserPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <UserPageContent />
    </Suspense>
  )
}

const UserPageContent = () => {
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
