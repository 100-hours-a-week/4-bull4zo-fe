import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParticipatedVotesInfinityQuery } from '@/api/services/vote/queries'
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
  const votes = data?.pages.flatMap((page) => page.votes) ?? []

  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '100px' })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <ul className="flex flex-col gap-4 pt-2">
      {votes.map((vote) => (
        <VoteItem key={vote?.voteId} {...vote} />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </ul>
  )
}
