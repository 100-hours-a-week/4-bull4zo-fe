import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { ResearchList } from '@/components/list/researchList'

const ResearchPage = () => {
  return (
    <article className="min-h-full">
      <div className="pl-4 py-3">
        <GroupDropDown />
      </div>
      {/* <div className="bg-gray w-full h-[0.625rem] mt-1" />
      <TopList /> */}
      <div className="bg-gray w-full h-[0.625rem] mt-1" />
      <ResearchList />
    </article>
  )
}
export default ResearchPage
