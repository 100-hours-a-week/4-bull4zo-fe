import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteCommentListQuery } from '@/api/services/comment/quries'
import { CommentItem } from '../comment/commentItem'

interface Props {
  voteId: number
}

export const CommentList = ({ voteId }: Props) => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteCommentListQuery(voteId)

  const { ref: lastItemRef, inView } = useInView({ threshold: 0 })

  const allComments = data?.pages.flatMap((page) => page.comments ?? []) ?? []

  // 마지막 요소가 보이면 다음 페이지 불러오기
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage])

  return (
    <ul className="mt-4 flex flex-col mx-9 gap-4">
      {allComments.map((comment, idx) => {
        const isLast = idx === allComments.length - 1
        return (
          <li key={comment.commentId} ref={isLast ? lastItemRef : undefined}>
            <CommentItem {...comment} />
            {!isLast && <hr className="border-t border-gray-300 mt-4" />}
          </li>
        )
      })}
    </ul>
  )
}
