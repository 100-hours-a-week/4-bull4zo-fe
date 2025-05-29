import { useParams } from 'react-router-dom'
import { Comment } from '@/api/services/comment/model'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/quries'
import { CommentItem } from '@/components/comment/commentItem'
import ResearchDetailInfo from '../components/researchDetailInfo'

const ResearchDetailPage = () => {
  const { voteId } = useParams()
  const { data: voteDetail, isLoading: detailLoading } = useVoteDetailInfo(voteId as string)
  const { data: voteResult, isLoading: resultLoading } = useVoteDetailResults(voteId as string)

  // 댓글 테스트 데이터
  const comment: Comment = {
    commentId: 1,
    content: '댓글 테스트\n 내이름은 말이지?',
    authorNickname: 'logan',
    createdAt: '2025-05-29T10:00',
    isMine: true,
    hidden: false,
    reportedByUser: false,
  }

  if (detailLoading || resultLoading) return <div>로딩중...</div>

  return (
    <article>
      <ResearchDetailInfo voteDetail={voteDetail} voteResult={voteResult} />
      <CommentItem {...comment} />
    </article>
  )
}
export default ResearchDetailPage
