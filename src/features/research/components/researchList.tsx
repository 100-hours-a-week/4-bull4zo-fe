import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  useCreateVotesInfinityQuery,
  useParticipatedVotesInfinityQuery,
} from '@/api/services/vote/queries'
import { VoteList } from '@/components/list/voteList'
import { Label } from '@/components/ui/label'
import { trackEvent } from '@/lib/trackEvent'
import { useGroupStore } from '@/stores/groupStore'
import { useScrollStore } from '@/stores/scrollStore'
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

  const onClickHandler = (index: number) => {
    setIndex(index)
    trackEvent({
      cta_id: 'vote_research_tab',
      action: 'tab',
      page: location.pathname,
    })
  }

  const { setScroll, getScroll } = useScrollStore()

  useEffect(() => {
    const main = document.getElementById('main-content')

    const handleScroll = () => {
      if (!main) return
      const y = main.scrollTop
      clearTimeout((handleScroll as any).timer)
      ;(handleScroll as any).timer = setTimeout(() => {
        setScroll('research', y)
      }, 100)
    }

    main?.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout((handleScroll as any).timer)
      main?.removeEventListener('scroll', handleScroll)
    }
  }, [setScroll])

  useEffect(() => {
    if (!data) return

    const timer = setTimeout(() => {
      const main = document.getElementById('main-content')
      if (main && main.scrollHeight > main.clientHeight) {
        main.scrollTo(0, getScroll('research') || 0)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [data, getScroll])

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
              className={`relative items-center justify-center z-10 cursor-pointer text-center text-sm sm:text-lg font-unbounded px-4 py-2 w-full ${
                index === i ? 'text-white font-bold' : 'text-black font-light'
              }`}
            >
              {label}
            </Label>
          </div>
        ))}
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
