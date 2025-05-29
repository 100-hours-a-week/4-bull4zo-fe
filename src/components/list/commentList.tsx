import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteCommentListQuery } from '@/api/services/comment/queries'
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
    <ul className="mt-4 flex flex-col mx-9 gap-4 mb-16">
      {allComments.map((comment, idx) => {
        const isLast = idx === allComments.length - 1
        return (
          <CommentItem
            key={comment.commentId}
            ref={isLast ? lastItemRef : undefined}
            {...comment}
          />
        )
      })}
      <p className="text-center text-sm font-[500]">마지막 댓글 입니다.</p>
    </ul>
  )
}
