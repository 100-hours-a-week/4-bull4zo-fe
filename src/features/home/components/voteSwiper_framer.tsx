import { useCallback, useEffect, useRef, useState } from 'react'
import { Vote, VoteData } from '@/api/services/vote/model'
import { useSubmitVoteMutation } from '@/api/services/vote/quries'
import DisLikeIcon from '@/assets/dislike.svg'
import LikeIcon from '@/assets/like.svg'
import PassIcon from '@/assets/pass.svg'
import { VoteEndCard } from '@/components/card/voteEndCard'
import { NoVoteAvailAbleModal } from '@/components/modal/noVoteAvailableModal'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { VoteChoice, useVoteBatchStore } from '../stores/batchVoteStore'
import { useVoteCardStore } from '../stores/voteCardStore'
import SwipeCard, { SwipeCardHandle } from './swipCard'

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
  const { isOpen, openModal } = useModalStore()

  const { cards: cardList, appendCards, filterByGroupId } = useVoteCardStore()
  const { hideUntil } = useTutorialStore()
  const { addVote, selectVote, resetVotes } = useVoteBatchStore()
  const { selectedId } = useGroupStore()
  const { mutateAsync } = useSubmitVoteMutation()

  // 남은 카드들을 관리
  const [swipeDir, setSwipeDir] = useState<VoteChoice>(null)

  useEffect(() => {
    const lastPage = pages[pages.length - 1]
    const newVotes = (lastPage?.votes ?? []).filter((v): v is Vote => v !== undefined && v !== null)

    appendCards(newVotes)
    filterByGroupId(selectedId)
  }, [pages, appendCards, cardList.length, selectedId, filterByGroupId])

  // 5개 모이면 자동 제출
  const submitVotes = useCallback(async () => {
    await Promise.all(
      selectVote.map(({ voteId, voteChoice }) => {
        const userResponse = voteChoice === '기권' ? 0 : voteChoice === '찬성' ? 1 : 2
        return mutateAsync({ voteId, userResponse })
      }),
    )
  }, [selectVote, mutateAsync])

  // 현재 새로고침 이슈를 해결하지 못해 1개마다 그냥 요청이 발생하도록 설정
  useEffect(() => {
    if (selectVote.length >= 1 && isLogin) {
      submitVotes()
      resetVotes()
    }
  }, [selectVote, submitVotes, resetVotes])

  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitializing(false)
    }, 0)

    return () => clearTimeout(timeout)
  }, [])

  // 카드 3장 남으면 fetchNextPage()
  useEffect(() => {
    if (isInitializing) return

    if (!isLogin && cardList.length === 0 && !isOpen && hideUntil !== null) {
      openModal(<NoVoteAvailAbleModal />)
    } else if (cardList.length <= 3 && isLogin && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [cardList, hasNextPage, isFetchingNextPage, fetchNextPage, isLogin, openModal, isInitializing])

  const topCardRef = useRef<SwipeCardHandle>(null)

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
          ${swipeDir === '기권' ? 'top-5 left-1/2 transform -translate-x-1/2' : ''}
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
            setSwipeDir={setSwipeDir}
            addVote={addVote}
            ref={isTop ? topCardRef : null}
          />
        )
      })}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-5">
        <button className="cursor-pointer " onClick={() => topCardRef.current?.swipe('반대')}>
          <img src={DisLikeIcon} alt="반대" className="w-16 h-16" />
        </button>
        <button onClick={() => topCardRef.current?.swipe('기권')}>
          <img src={PassIcon} alt="반대" className="w-16 h-16" />
        </button>
        <button onClick={() => topCardRef.current?.swipe('찬성')}>
          <img src={LikeIcon} alt="찬성" className="w-16 h-16" />
        </button>
      </div>
    </div>
  )
}
export default VoteSwiperFramer
