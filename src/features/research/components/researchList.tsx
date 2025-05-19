import {
  useCreateVotesInfinityQuery,
  useParticipatedVotesInfinityQuery,
} from '@/api/services/vote/quries'
import { VoteList } from '@/components/list/voteList'
import { Label } from '@/components/ui/label'
import { trackEvent } from '@/lib/trackEvent'
import { useGroupStore } from '@/stores/groupStore'
import { useResearchTabStore } from '../stores/researchTapStore'

export const ResearchList = () => {
  const { index, setIndex } = useResearchTabStore()
  const { selectedId } = useGroupStore()

  const participatedQuery = useParticipatedVotesInfinityQuery({
    groupId: selectedId,
  })

  const myVotesQuery = useCreateVotesInfinityQuery({
    groupId: selectedId,
  })

  const data = index === 0 ? participatedQuery.data : myVotesQuery.data
  const fetchNextPage = index === 0 ? participatedQuery.fetchNextPage : myVotesQuery.fetchNextPage
  const hasNextPage = index === 0 ? participatedQuery.hasNextPage : myVotesQuery.hasNextPage
  const isFetchingNextPage =
    index === 0 ? participatedQuery.isFetchingNextPage : myVotesQuery.isFetchingNextPage

  return (
    <section className="px-7 py-2">
      <div className="flex items-center justify-around mb-4">
        <div className="" />
        <Label
          onClick={() => {
            setIndex(0)
            trackEvent({
              cta_id: 'vote_research_tab',
              action: 'tab',
              page: location.pathname,
            })
          }}
          className={`text-2xl flex items-center justify-end font-unbounded cursor-pointer w-35 ${index === 0 ? 'font-bold' : 'font-light'}`}
        >
          참여한 투표
        </Label>
        <div className="h-6 bg-black w-[1px]" />
        <Label
          onClick={() => {
            setIndex(1)
            trackEvent({
              cta_id: 'vote_research_tab',
              action: 'tab',
              page: location.pathname,
            })
          }}
          className={`text-2xl font-unbounded cursor-pointer ${index === 1 ? 'font-bold' : 'font-light'}`}
        >
          내가 만든 투표
        </Label>
        <div />
      </div>
      <VoteList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </section>
  )
}
