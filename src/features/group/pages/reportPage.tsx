import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useGroupAnalysisQuery } from '@/api/services/group/queries'
import NotFoundPage from '@/app/NotFound'
import { LoadingPage } from '@/components/loading/loadingPage'
import {
  ReportContentAnalysis,
  ReportContentChart,
  // ReportContentVotes,
} from '@/features/group/components/report/index'

const ReportPage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <ReportPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ReportPage

const ReportPageContent = () => {
  const { groupId } = useParams()

  const { data } = useGroupAnalysisQuery(parseInt(groupId!))

  return (
    <article className="py-5 pb-8 min-h-full">
      <ReportContentChart data={data} />
      {/* <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <ReportContentVotes groupId={parseInt(groupId!)} /> */}
      <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <ReportContentAnalysis data={data} />
    </article>
  )
}
