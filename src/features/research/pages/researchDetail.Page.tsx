import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { infiniteCommentQueryOptions } from '@/api/services/comment/queries'
import { voteDetailQueryOptions, voteResultQueryOptions } from '@/api/services/vote/queries'
import { NotFoundPage } from '@/app/index'
import { CommentList, LoadingPage } from '@/components/index'
import { CommentInput, ResearchDetailInfo } from '../components/index'

const ResearchDetailPage = () => {
  const { voteId } = useParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery(voteDetailQueryOptions(voteId as string))
    queryClient.prefetchQuery(voteResultQueryOptions(voteId as string))
    queryClient.prefetchInfiniteQuery(infiniteCommentQueryOptions(voteId as string))
  }, [queryClient, voteId])

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
  const { data: voteDetail } = useSuspenseQuery(voteDetailQueryOptions(voteId as string))
  const { data: voteResult } = useSuspenseQuery(voteResultQueryOptions(voteId as string))

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
