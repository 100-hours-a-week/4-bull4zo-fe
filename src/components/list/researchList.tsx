import { Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  useCreateVotesInfinityQuery,
  useParticipatedVotesInfinityQuery,
} from '@/api/services/vote/queries'
import { Label, LoadingPage, VoteList } from '@/components/index'
import { useResearchTabStore } from '@/features/research/stores/researchTapStore'
import { trackEvent } from '@/lib/trackEvent'
import { useGroupStore } from '@/stores/index'

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

  const onClickHandler = (index: number) => {
    setIndex(index)
    trackEvent({
      cta_id: 'vote_research_tab',
      action: 'tab',
      page: location.pathname,
    })
  }

  const tabs = ['참여한 투표', '내가 만든 투표']

  return (
    <section className="px-7 py-4">
      <div className="relative flex w-fit mx-auto mb-4 rounded-full shadow-md bg-white">
        {tabs.map((label, i) => (
          <div key={label} className="relative w-36">
            {index === i && (
              <motion.div
                layoutId="vote-tab"
                className="absolute inset-0 z-0 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Label
              onClick={() => onClickHandler(i)}
              className={`relative items-center justify-center z-10 cursor-pointer text-center text-sm sm:text-lg px-4 py-2 w-full ${
                index === i ? 'text-white font-bold' : 'text-black font-light'
              }`}
            >
              {label}
            </Label>
          </div>
        ))}
      </div>
      <Suspense fallback={<LoadingPage />}>
        <VoteList data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      </Suspense>
    </section>
  )
}
