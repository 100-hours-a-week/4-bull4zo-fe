import { useParams } from 'react-router-dom'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/quries'
import { CommentList } from '@/components/list/commentList'
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
    </article>
  )
}
export default ResearchDetailPage
