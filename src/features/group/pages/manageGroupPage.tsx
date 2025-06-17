import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import { useGroupQuery } from '@/api/services/group/queries'
import NotFoundPage from '@/app/NotFound'
import { LoadingPage } from '@/components/loading/loadingPage'
import { GroupMember } from '../components/groupMember'
import { GroupReport } from '../components/groupReport'
import { UpdateGroupForm } from '../components/updateGroupForm'

const ManageGroupPage = () => {
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
  const { data: group } = useGroupQuery(Number(groupId))

  if (!group) return

  return (
    <article className="py-5 min-h-full">
      <UpdateGroupForm group={group} />
      <div className="w-full max-w-[450px] my-3 bg-gray h-[0.625rem]" />
      <GroupReport group={group} />
      <div className="w-full max-w-[450px] my-3 bg-gray h-[0.625rem]" />
      <GroupMember />
    </article>
  )
}
export default ManageGroupPage
