import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
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

  const newCommentsRef = useRef<Comment[]>([])
  const [newComments, setNewComments] = useState<Comment[]>([])
  const isMounted = useRef(true)
  const isPolling = useRef(false)

  const allComments = useMemo(
    () => [...(data?.pages.flatMap((page) => page.comments) ?? []), ...newComments],
    [data, newComments],
  )

  // 롱폴링 로직
  // const pollingKey = useRef(Symbol())

  const hasStartedPolling = useRef(false)

  useEffect(() => {
    if (!data || isPolling.current || hasStartedPolling.current) return
    if (hasNextPage) return

    hasStartedPolling.current = true
    isMounted.current = true
    isPolling.current = true

    // pollingKey.current = Symbol()
    // const currentKey = pollingKey.current

    let timer: ReturnType<typeof setTimeout> | undefined
    let hasRetried = false

    const poll = async () => {
      const all = [...(data.pages.flatMap((p) => p.comments) ?? []), ...newCommentsRef.current]
      const last = all.at(-1)
      const lastCursor = last ? `${last.createdAt}_${last.commentId}` : undefined

      try {
        const result = await commentService.getLongPollingCommentList(voteId, lastCursor)

        // if (!isMounted.current || pollingKey.current !== currentKey) return

        if (result?.comments?.length > 0) {
          setNewComments((prev) => {
            const existing = new Set(
              [...(data.pages.flatMap((p) => p.comments) ?? []), ...prev].map(
                (c) => `${c.createdAt}_${c.commentId}`,
              ),
            )
            const filtered = result.comments.filter(
              (c) => !existing.has(`${c.createdAt}_${c.commentId}`),
            )
            const updated = [...prev, ...filtered]
            newCommentsRef.current = updated
            return updated
          })
        }

        hasRetried = false
        timer = setTimeout(poll, 0)
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        // if (!isMounted.current || pollingKey.current !== currentKey) return
        if (!isMounted.current) return
        if (!hasRetried) {
          hasRetried = true
          timer = setTimeout(poll, 2000)
        }
      }
    }

    poll()

    return () => {
      isMounted.current = false
      isPolling.current = false
      if (timer) clearTimeout(timer)
      // abortControllerRef.current?.abort()
    }
  }, [data, hasNextPage])

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
