import { Suspense } from 'react'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { LoadingPage } from '@/components/loading/loadingPage'
import { MakeVoteForm } from '../components/makeVoteForm'

const MakePage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <MakePageContent />
    </Suspense>
  )
}

export default MakePage

const MakePageContent = () => {
  return (
    <article className="min-h-full w-full overflow-y-auto pb-4">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <MakeVoteForm />
    </article>
  )
}
