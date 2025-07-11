import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/queries'
import { NotFoundPage } from '@/app/index'
import { CommentList, LoadingPage } from '@/components/index'
import { CommentInput, ResearchDetailInfo } from '../components/index'

const ResearchDetailPage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <ResearchDetailPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

const ResearchDetailPageContent = () => {
  const { voteId } = useParams()
  const { data: voteDetail } = useVoteDetailInfo(voteId as string)
  const { data: voteResult } = useVoteDetailResults(voteId as string)

  return (
    <article>
      <div className="pb-16">
        <ResearchDetailInfo voteDetail={voteDetail} voteResult={voteResult} />
        <CommentList voteId={Number(voteId)} />
      </div>
      <div className="bg-white fixed bottom-16 w-full max-w-[450px]">
        <div className="bg-yellow py-2">
          <CommentInput />
        </div>
      </div>
    </article>
  )
}
export default ResearchDetailPage
