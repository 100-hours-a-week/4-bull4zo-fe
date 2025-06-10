import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Comment } from '@/api/services/comment/model'
import {
  useInfiniteCommentListQuery,
  useLongPollingCommentListQuery,
} from '@/api/services/comment/queries'
import { CommentItem } from '../comment/commentItem'

interface Props {
  voteId: number
}

export const CommentList = ({ voteId }: Props) => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteCommentListQuery(voteId)

  const { ref: lastItemRef, inView } = useInView({ threshold: 0 })

  const [newComments, setNewComments] = useState<Comment[]>([])
  const isMounted = useRef(true)

  const allComments = useMemo(
    () => [...(data?.pages.flatMap((page) => page.comments) ?? []), ...newComments],
    [data, newComments],
  )

  // 마지막 커서 계산
  const lastCursor = useMemo(() => {
    const last = data?.pages.at(-1)?.comments.at(-1)
    return last ? `${last.createdAt}_${last.commentId}` : undefined
  }, [data])

  const longPollingEnabled = !hasNextPage && !!lastCursor

  const { data: newData, refetch: refetchLongPolling } = useLongPollingCommentListQuery(
    voteId,
    lastCursor,
    longPollingEnabled,
  )

  // 신규 댓글 추가
  useEffect(() => {
    if (newData?.comments?.length) {
      setNewComments((prev) => [...prev, ...newData.comments])
    }
  }, [newData])

  // 롱 폴링 주기 설정
  useEffect(() => {
    if (!longPollingEnabled) return

    let timer: ReturnType<typeof setTimeout>
    let hasRetried = false

    const poll = async () => {
      const result = await refetchLongPolling()

      if (!isMounted.current) return

      if (result?.status === 'success') {
        hasRetried = false
        timer = setTimeout(poll)
      } else if (!hasRetried) {
        hasRetried = true
        timer = setTimeout(poll, 3000)
      } else {
        toast.error('댓글을 불러오는 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.')
      }
    }

    poll()

    return () => {
      isMounted.current = false
      clearTimeout(timer)
    }
  }, [longPollingEnabled, refetchLongPolling])

  // 무한 스크롤 처리
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
            ref={isLast && hasNextPage ? lastItemRef : undefined}
            {...comment}
          />
        )
      })}
      {!hasNextPage && <p className="text-center text-sm font-[500]">마지막 댓글입니다.</p>}
    </ul>
  )
}
