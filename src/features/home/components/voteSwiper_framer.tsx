import { useCallback, useEffect, useRef, useState } from 'react'
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
import { useVoteCardStore } from '../stores/voteCardStore'
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
  const { isOpen, openModal } = useModalStore()

  const { cards: cardList, appendCards } = useVoteCardStore()

  const { addVote, selectVote, resetVotes } = useVoteBatchStore()
  const { mutateAsync } = useSubmitVoteMutation()

  // 남은 카드들을 관리
  const [swipeDir, setSwipeDir] = useState<VoteChoice>(null)

  useEffect(() => {
    const lastPage = pages[pages.length - 1]
    const newVotes = (lastPage?.votes ?? []).filter((v): v is Vote => v !== undefined && v !== null)

    if (cardList.length === 0) {
      appendCards(newVotes)
    } else if (pages.length > 1) {
      appendCards(newVotes)
    }
  }, [pages, appendCards, cardList.length])

  // 5개 모이면 자동 제출
  const submitVotes = useCallback(async () => {
    await Promise.all(
      selectVote.map(({ voteId, voteChoice }) => {
        const userResponse = voteChoice === '기권' ? 0 : voteChoice === '찬성' ? 1 : 2
        return mutateAsync({ voteId, userResponse })
      }),
    )
  }, [selectVote, mutateAsync])

  // unmount시 자동 요청 전송을 위한 ref
  const selectVoteRef = useRef(selectVote)
  const mutateAsyncRef = useRef(mutateAsync)

  useEffect(() => {
    selectVoteRef.current = selectVote
  }, [selectVote])

  useEffect(() => {
    mutateAsyncRef.current = mutateAsync
  }, [mutateAsync])

  useEffect(() => {
    return () => {
      const sendRemainingVotes = async () => {
        if (selectVoteRef.current.length > 0) {
          await Promise.all(
            selectVoteRef.current.map(({ voteId, voteChoice }) => {
              const userResponse = voteChoice === '기권' ? 0 : voteChoice === '찬성' ? 1 : 2
              return mutateAsyncRef.current({ voteId, userResponse })
            }),
          )
          resetVotes()
        }
      }
      sendRemainingVotes()
    }
  }, [])

  useEffect(() => {
    if (selectVote.length >= 5) {
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

    if (!isLogin && cardList.length === 0 && !isOpen) {
      openModal(<NoVoteAvailAbleModal />)
    } else if (cardList.length <= 3 && isLogin && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [cardList, hasNextPage, isFetchingNextPage, fetchNextPage, isLogin, openModal, isInitializing])

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
            setSwipeDir={setSwipeDir}
            addVote={addVote}
          />
        )
      })}
    </div>
  )
}
export default VoteSwiperFramer
