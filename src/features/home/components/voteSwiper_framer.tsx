import { memo, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { VoteChoice } from '@/api/services/vote/model'
import { useSubmitVoteMutation } from '@/api/services/vote/queries'
import { NoVoteAvailableModal, VoteEndCard } from '@/components/index'
import { useModalStore, useTutorialStore, useUserStore } from '@/stores/index'
import { useVoteCardStore } from '../stores/voteCardStore'
import { SwipeCard, SwipeCardHandle, VoteDirectionButtonGroup } from './index'

type Props = {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const VoteSwiperFramer = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) => {
  const { isLogin } = useUserStore()
  const { isOpen, openModal } = useModalStore()

  const { cards: cardList } = useVoteCardStore()
  const { isHidden } = useTutorialStore()
  const { mutateAsync } = useMutation({
    ...useSubmitVoteMutation,
  })

  // 남은 카드들을 관리
  const [swipeDir, setSwipeDir] = useState<VoteChoice>(null)

  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    setIsInitializing(false)
  }, [])

  // 카드 3장 남으면 fetchNextPage()
  useEffect(() => {
    if (isInitializing) return

    if (!isLogin && cardList.length === 0 && !isOpen && isHidden) {
      openModal(<NoVoteAvailableModal />)
    } else if (cardList.length <= 3 && isLogin && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [
    cardList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLogin,
    openModal,
    isInitializing,
    isOpen,
    isHidden,
  ])

  const topCardRef = useRef<SwipeCardHandle>(null)

  // Keyboard 스와이프
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!topCardRef.current) return

      if (event.key === 'ArrowLeft') {
        topCardRef.current.swipe('반대')
      } else if (event.key === 'ArrowRight') {
        topCardRef.current.swipe('찬성')
      } else if (event.key === 'ArrowUp') {
        topCardRef.current.swipe('기권')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (cardList.length === 0)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <VoteEndCard />
      </div>
    )

  return (
    <div className={`flex justify-center items-center h-full relative overflow-hidden `}>
      {cardList.slice(0, 3).map((vote, index) => {
        const isTop = index === 0

        return (
          <SwipeCard
            key={vote.voteId}
            vote={vote}
            isTop={isTop}
            index={index}
            setSwipeDir={setSwipeDir}
            mutateVote={mutateAsync}
            ref={isTop ? topCardRef : null}
          />
        )
      })}
      <VoteDirectionButtonGroup
        swipeDir={swipeDir}
        onSwipe={(dir) => topCardRef.current?.swipe(dir)}
      />
    </div>
  )
}
export default memo(VoteSwiperFramer)
