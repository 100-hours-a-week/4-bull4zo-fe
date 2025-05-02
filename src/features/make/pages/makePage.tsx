import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { MakeVoteForm } from '../components/makeVoteForm'

const MakePage = () => {
  return (
    <article className="overflow-hidden h-full w-full relative">
      <div className="absolute z-10 left-4 top-3">
        <GroupDropDown />
      </div>
      <MakeVoteForm />
    </article>
  )
}
export default MakePage
