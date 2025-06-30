import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useGroupAnalysisQuery } from '@/api/services/group/queries'
import { LoadingPage } from '@/components/loading/loadingPage'
import {
  ReportContentAnalysis,
  ReportContentChart,
  ReportContentVotes,
} from '../components/ReportContent'

const ReportPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ReportPageContent />
    </Suspense>
  )
}

export default ReportPage

const ReportPageContent = () => {
  const { groupId } = useParams()

  const { data } = useGroupAnalysisQuery(parseInt(groupId!))

  return (
    <article className="py-5 min-h-full">
      <ReportContentChart data={data} />
      <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <ReportContentVotes groupId={parseInt(groupId!)} />
      <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <ReportContentAnalysis data={data} />
    </article>
  )
}
