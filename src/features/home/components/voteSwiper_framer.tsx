import { useCallback, useEffect, useState } from 'react'
import { Vote, VoteData } from '@/api/services/vote/model'
import { useSubmitVoteMutation } from '@/api/services/vote/quries'
import { VoteEndCard } from '@/components/card/voteEndCard'
import { NoVoteAvailAbleModal } from '@/components/modal/noVoteAvailableModal'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { VoteChoice, useVoteBatchStore } from '../stores/batchVoteStore'
import SwipeCard from './swipCard'

type Props = {
  pages: VoteData[]
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const VoteSwiperFramer = ({
  pages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const votes = pages
    .flatMap((page) => page?.votes ?? [])
    .filter((v): v is Vote => v !== undefined && v !== null)
  const { isLogin } = useUserStore()
  const { openModal } = useModalStore()

  const { addVote, selectVote, resetVotes } = useVoteBatchStore()
  const { mutateAsync } = useSubmitVoteMutation()

  // 남은 카드들을 관리
  const [cardList, setCardList] = useState(votes)

  const [swipeDir, setSwipeDir] = useState<VoteChoice>(null)

  // 5개 모이면 자동 제출
  const submitVotes = useCallback(async () => {
    await Promise.all(
      selectVote.map(({ voteId, voteChoice }) => {
        const userResponse = voteChoice === '기권' ? 0 : voteChoice === '찬성' ? 1 : 2
        return mutateAsync({ voteId, userResponse })
      }),
    )
  }, [selectVote, mutateAsync])

  useEffect(() => {
    if (selectVote.length >= 5) {
      submitVotes()
      resetVotes()
    }
  }, [selectVote, submitVotes, resetVotes])

  // 카드 1장 남으면 fetchNextPage()
  useEffect(() => {
    if (!isLogin && cardList.length === 0) {
      openModal(<NoVoteAvailAbleModal />)
    } else if (cardList.length === 1 && isLogin && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [cardList, hasNextPage, isFetchingNextPage, fetchNextPage, isLogin, openModal])

  if (cardList.length === 0)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <VoteEndCard />
      </div>
    )

  return (
    <div className={`flex justify-center items-center h-full relative overflow-hidden `}>
      <div
        className={`absolute text-3xl font-bold z-[9999]
    ${swipeDir === '찬성' ? 'top-10 right-10 text-blue-600 rotate-12' : ''}
    ${swipeDir === '반대' ? 'top-10 left-10 text-red-500 -rotate-12' : ''}
    ${swipeDir === '기권' ? 'bottom-5 left-1/2 transform -translate-x-1/2 text-gray-600' : ''}
  `}
      >
        {swipeDir && <span>{swipeDir}</span>}
      </div>

      {cardList.map((vote, index) => {
        const isTop = index === 0

        return (
          <SwipeCard
            key={vote.voteId}
            vote={vote}
            isTop={isTop}
            index={index}
            cardList={cardList}
            setCardList={setCardList}
            setSwipeDir={setSwipeDir}
            addVote={addVote}
          />
        )
      })}
    </div>
  )
}
export default VoteSwiperFramer
