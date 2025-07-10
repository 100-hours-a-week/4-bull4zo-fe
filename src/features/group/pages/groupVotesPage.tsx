import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { groupQueryOptions, infiniteGroupVotesQueryOptions } from '@/api/services/group/queries'
import { NotFoundPage } from '@/app/index'
import { LoadingPage, VoteList } from '@/components/index'

const GroupVotesPage = () => {
  const { groupId } = useParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchInfiniteQuery(infiniteGroupVotesQueryOptions(Number(groupId)))
  }, [queryClient, groupId])

  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <GroupVotesPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}
export default GroupVotesPage

const GroupVotesPageContent = () => {
  const { groupId } = useParams()

  const { data: group } = useSuspenseQuery(groupQueryOptions(Number(groupId)))
  const {
    data: votes,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(infiniteGroupVotesQueryOptions(Number(groupId)))

  return (
    <article className="px-5 py-5 min-h-full">
      <h1 className="text-lg font-semibold">{group?.name}</h1>
      <VoteList data={votes} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </article>
  )
}
