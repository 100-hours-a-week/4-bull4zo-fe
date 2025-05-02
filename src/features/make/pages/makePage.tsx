import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { MakeVoteForm } from '../components/makeVoteForm'

const MakePage = () => {
  return (
    <article className="h-full w-full relative overflow-y-auto">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <MakeVoteForm />
    </article>
  )
}
export default MakePage
