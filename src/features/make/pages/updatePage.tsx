import { Suspense } from 'react'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { LoadingPage } from '@/components/loading/loadingPage'
import { UpdateVoteForm } from '../components/updateVoteForm'

const UpdatePage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <UpdatePageContent />
    </Suspense>
  )
}

export default UpdatePage

const UpdatePageContent = () => {
  return (
    <article className="min-h-full w-full overflow-y-auto pb-4">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <UpdateVoteForm />
    </article>
  )
}
