import { useCallback, useEffect, useState } from 'react'
import { Vote, VoteData } from '@/api/services/vote/model'
import { useSubmitVoteMutation } from '@/api/services/vote/quries'
import DisLikeIcon from '@/assets/dislike.svg'
import LikeIcon from '@/assets/like.svg'
import PassIcon from '@/assets/pass.svg'
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
  const { isLogin } = useUserStore()
  const { openModal } = useModalStore()

  const { addVote, selectVote, resetVotes } = useVoteBatchStore()
  const { mutateAsync } = useSubmitVoteMutation()

  const [initialized, setInitialized] = useState(false)

  // 남은 카드들을 관리
  const [cardList, setCardList] = useState<Vote[]>([])
  const [swipeDir, setSwipeDir] = useState<VoteChoice>(null)

  useEffect(() => {
    const lastPage = pages[pages.length - 1]
    const newVotes = (lastPage?.votes ?? []).filter((v): v is Vote => v !== undefined && v !== null)

    setCardList((prev) => {
      if (pages.length === 1) {
        return newVotes
      }
      const prevPage = pages[pages.length - 2]
      const prevVotes = (prevPage?.votes ?? []).filter(
        (v): v is Vote => v !== undefined && v !== null,
      )
      const lastThree = prevVotes.slice(-3)

      const existingIds = new Set(prev.map((v) => v.voteId))
      const combinedVotes = [...lastThree, ...newVotes]
      const uniqueVotes = combinedVotes.filter((v) => !existingIds.has(v.voteId))

      return [...prev, ...uniqueVotes]
    })

    if (newVotes.length > 0) setInitialized(true)
  }, [pages])

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
    if (!initialized) return

    if (!isLogin && cardList.length === 0) {
      openModal(<NoVoteAvailAbleModal />)
    } else if (cardList.length <= 3 && isLogin && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [cardList, hasNextPage, isFetchingNextPage, fetchNextPage, isLogin, openModal, initialized])

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
          ${swipeDir === '찬성' ? 'top-10 right-10' : ''}
          ${swipeDir === '반대' ? 'top-10 left-10' : ''}
          ${swipeDir === '기권' ? 'bottom-5 left-1/2 transform -translate-x-1/2' : ''}
        `}
      >
        {swipeDir === '찬성' && <img src={LikeIcon} alt="찬성" className="w-16 h-16" />}
        {swipeDir === '반대' && <img src={DisLikeIcon} alt="반대" className="w-16 h-16" />}
        {swipeDir === '기권' && <img src={PassIcon} alt="기권" className="w-16 h-16" />}
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
