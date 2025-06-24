import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { NotFoundPage } from '@/app/NotFound'
// import { useParams } from 'react-router-dom'
// import { useTop3VotesQuery } from '@/api/services/vote/queries'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { ResearchList } from '@/components/list/researchList'
import { LoadingPage } from '@/components/loading/loadingPage'

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
  // const { groupId } = useParams()

  // const { data } = useTop3VotesQuery(parseInt(groupId!), undefined)

  return (
    <article className="min-h-full">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      {/* <div className="bg-gray w-full h-[0.625rem] mt-1" />
      <TopList data={data} /> */}
      <div className="bg-line w-full h-[0.625rem] mt-1" />
      <ResearchList />
    </article>
  )
}
