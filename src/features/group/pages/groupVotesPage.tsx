import { useParams } from 'react-router-dom'
import { useGroupQuery, useGroupVotesInfiniteQuery } from '@/api/services/group/queries'
import { VoteList } from '@/components/list/voteList'

export const GroupVotesPage = () => {
  const { groupId } = useParams()

  const { data: group } = useGroupQuery(Number(groupId))
  const {
    data: votes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGroupVotesInfiniteQuery(Number(groupId))

  return (
    <article className="px-5 py-5 min-h-full">
      <h1 className="text-lg font-semibold">{group?.name}</h1>
      <VoteList
        data={votes}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </article>
  )
}
