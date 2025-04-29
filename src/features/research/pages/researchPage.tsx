import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { ResearchList } from '../components/researchList'

const ResearchPage = () => {
  return (
    <article className="min-h-full overflow-y-auto">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      <div className="bg-gray w-full h-[0.625rem]" />
      {/* <TopList /> */}
      <ResearchList />
    </article>
  )
}
export default ResearchPage
