import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { NotFoundPage } from '@/app/index'
import { GroupDropDown, LoadingPage } from '@/components/index'
import { UpdateVoteForm } from '../components/index'

const UpdatePage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <UpdatePageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default UpdatePage

const UpdatePageContent = () => {
  return (
    <article className="min-h-full w-full overflow-y-auto pb-4">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <UpdateVoteForm />
    </article>
  )
}
