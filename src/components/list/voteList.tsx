import { useEffect, useRef } from 'react'
import { useParticipatedVotesInfinityQuery } from '@/api/services/vote/quries'
import { VoteItem } from '../item/voteItem'

type VoteListProps = {
  data: ReturnType<typeof useParticipatedVotesInfinityQuery>['data']
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const VoteList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: VoteListProps) => {
  const votes = data?.pages.flatMap((page) => page.data?.votes) ?? []

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { rootMargin: '100px' },
    )

    const target = loadMoreRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  })

  return (
    <ul className="flex flex-col gap-4 px-2 pt-2">
      {votes.map((vote) => (
        <VoteItem key={vote?.voteId} {...vote} />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </ul>
  )
}
