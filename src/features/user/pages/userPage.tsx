import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import NotFoundPage from '@/app/NotFound'
import { UserGroupList } from '@/components/list/userGroupList'
import { LoadingPage } from '@/components/loading/loadingPage'
import { UserCard } from '@/features/user/components/userCard'
import { UserFeedbackWidget } from '../components/userFeedbackWidget'

const UserPage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <UserPageContent />
      </Suspense>
    </ErrorBoundary>
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
