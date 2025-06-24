import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { NotFoundPage } from '@/app/index'
import { GroupDropDown, LoadingPage, ResearchList } from '@/components/index'

const ResearchPage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <ResearchPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ResearchPage

const ResearchPageContent = () => {
  return (
    <article className="min-h-full">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      {/* <div className="bg-gray w-full h-[0.625rem] mt-1" />
      <TopList /> */}
      <div className="bg-line w-full h-[0.625rem] mt-1" />
      <ResearchList />
    </article>
  )
}
