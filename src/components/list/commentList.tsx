import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Comment } from '@/api/services/comment/model'
import { useInfiniteCommentListQuery } from '@/api/services/comment/queries'
import { commentService } from '@/api/services/comment/service'
import { CommentItem } from '../comment/commentItem'

interface Props {
  voteId: number
}

export const CommentList = ({ voteId }: Props) => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteCommentListQuery(voteId)

  const { ref: lastItemRef, inView } = useInView({ threshold: 0 })

  const [newComments, setNewComments] = useState<Comment[]>([])
  const isMounted = useRef(true)
  const isPolling = useRef(false)

  const allComments = useMemo(
    () => [...(data?.pages.flatMap((page) => page.comments) ?? []), ...newComments],
    [data, newComments],
  )

  // 마지막 커서 계산
  const lastCursor = useMemo(() => {
    const lastAll = [...(data?.pages.flatMap((p) => p.comments) ?? []), ...newComments].at(-1)
    return lastAll ? `${lastAll.createdAt}_${lastAll.commentId}` : undefined
  }, [data, newComments])

  const longPollingEnabled = !hasNextPage && !!lastCursor

  // 롱폴링 로직
  useEffect(() => {
    if (!longPollingEnabled || isPolling.current) return

    isMounted.current = true
    isPolling.current = true
    let timer: ReturnType<typeof setTimeout>
    let hasRetried = false

    const poll = async () => {
      try {
        const data = await commentService.getLongPollingCommentList(voteId, lastCursor)

        if (!isMounted.current) return

        if (data?.comments?.length > 0) {
          setNewComments((prev) => [...prev, ...data.comments])
        }

        hasRetried = false
        timer = setTimeout(poll)
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        if (!isMounted.current) return

        if (!hasRetried) {
          hasRetried = true
          timer = setTimeout(poll)
        } else {
          toast.error('댓글을 불러오는 중 오류가 발생했습니다.')
        }
      }
    }

    poll()

    return () => {
      isMounted.current = false
      isPolling.current = false
      clearTimeout(timer)
    }
  }, [longPollingEnabled])

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
