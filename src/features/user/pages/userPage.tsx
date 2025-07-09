import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { NotFoundPage } from '@/app/index'
import { LoadingPage, UserGroupList } from '@/components/index'
import { UserCard, UserFeedbackWidget } from '@/features/user/components/index'

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
