import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQueryClient } from '@tanstack/react-query'
import {
  infinityCreateVotesQueryOptions,
  infinityParticipatedVotesQueryOptions,
} from '@/api/services/vote/queries'
import { NotFoundPage } from '@/app/page/NotFound'
import { TopList } from '@/components'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { ResearchList } from '@/components/list/researchList'
import { LoadingPage } from '@/components/loading/loadingPage'
import { useGroupStore } from '@/stores'

const ResearchPage = () => {
  const { selectedId } = useGroupStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchInfiniteQuery(infinityCreateVotesQueryOptions({ groupId: selectedId }))
    queryClient.prefetchInfiniteQuery(
      infinityParticipatedVotesQueryOptions({ groupId: selectedId }),
    )
  }, [queryClient, selectedId])

  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <ResearchPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ResearchPage

const ResearchPageContent = () => {
  return (
    <article className="min-h-full">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <div className="bg-line w-full h-[0.625rem] mt-1" />
      <TopList />
      <div className="bg-line w-full h-[0.625rem] mt-1" />
      <ResearchList />
    </article>
  )
}
