import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { MakeVoteForm } from '../components/makeVoteForm'

const MakePage = () => {
  return (
    <article className="min-h-full w-full overflow-y-auto pb-4">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <MakeVoteForm />
    </article>
  )
}
export default MakePage
