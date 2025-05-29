import { useParams } from 'react-router-dom'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/queries'
import { CommentList } from '@/components/list/commentList'
import { CommentInput } from '../components/commentInput'
import ResearchDetailInfo from '../components/researchDetailInfo'

const ResearchDetailPage = () => {
  const { voteId } = useParams()
  const { data: voteDetail, isLoading: detailLoading } = useVoteDetailInfo(voteId as string)
  const { data: voteResult, isLoading: resultLoading } = useVoteDetailResults(voteId as string)

  if (detailLoading || resultLoading) return

  return (
    <article>
      <ResearchDetailInfo voteDetail={voteDetail} voteResult={voteResult} />
      <CommentList voteId={Number(voteId)} />
      <div className="fixed bottom-16 w-full max-w-[450px]">
        <CommentInput />
      </div>
    </article>
  )
}
export default ResearchDetailPage
