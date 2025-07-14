import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { groupMemberQueryOptions, groupQueryOptions } from '@/api/services/group/queries'
import { NotFoundPage } from '@/app/NotFound'
import { LoadingPage } from '@/components/loading/loadingPage'
import { GroupMember, GroupReport, UpdateGroupForm } from '@/features/group/components/group/index'

const ManageGroupPage = () => {
  const { groupId } = useParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery(groupMemberQueryOptions(Number(groupId)))
  }, [queryClient, groupId])

  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <ManageGroupPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

const ManageGroupPageContent = () => {
  const { groupId } = useParams()
  const { data: group } = useSuspenseQuery(groupQueryOptions(Number(groupId)))

  if (!group) return

  return (
    <article className="py-5 min-h-full">
      <UpdateGroupForm group={group} />
      <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <GroupReport group={group} />
      <div className="w-full max-w-[450px] my-3 bg-line h-[0.625rem]" />
      <GroupMember />
    </article>
  )
}
export default ManageGroupPage
