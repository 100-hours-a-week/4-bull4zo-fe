import React, { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Vote } from '@/api/services/vote/model'
import { VoteCard } from '@/components/card/voteCard'
import { VoteChoice, VoteStore } from '../stores/batchVoteStore'
import { useVoteCardStore } from '../stores/voteCardStore'

type SwipeCardProps = {
  vote: Partial<Vote>
  isTop: boolean
  index: number
  // eslint-disable-next-line no-unused-vars
  setSwipeDir: (dir: VoteChoice) => void
  // eslint-disable-next-line no-unused-vars
  addVote: (vote: VoteStore) => void
}

const SwipeCard = React.memo((props: SwipeCardProps) => {
  const { vote, isTop, index, setSwipeDir, addVote } = props

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-20, 20])

  const { cards: cardList, removeCard } = useVoteCardStore()

  // drag 중 라벨 업데이트
  useEffect(() => {
    const unsubscribe = x.on('change', (latestX) => {
      if (!isTop) return
      const latestY = y.get()

      if (latestX > 150) setSwipeDir('찬성')
      else if (latestX < -150) setSwipeDir('반대')
      else if (Math.abs(latestX) < 80 && latestY < -150) setSwipeDir('기권')
      else setSwipeDir(null)
    })

    const unsubscribeY = y.on('change', (latestY) => {
      if (!isTop) return
      const latestX = x.get()

      if (latestX > 60) setSwipeDir('찬성')
      else if (latestX < -60) setSwipeDir('반대')
      else if (Math.abs(latestX) < 60 && latestY < -60) setSwipeDir('기권')
      else setSwipeDir(null)
    })

    return () => {
      unsubscribe()
      unsubscribeY()
    }
  }, [x, y, isTop, setSwipeDir])

  const handleSwipe = (voteChoice: VoteChoice, offsetX: number, offsetY: number) => {
    addVote({ voteId: vote.voteId as number, voteChoice })

    const targetX = offsetX * 3
    const targetY = offsetY * 3

    animate(x, targetX, { duration: 0.3 })
    animate(y, targetY, { duration: 0.3 })

    setTimeout(() => {
      removeCard(vote.voteId as number)
      setSwipeDir(null)
    }, 100)
  }

  return (
    <motion.div
      className=" absolute flex items-center h-full w-full justify-center"
      style={{
        x,
        y,
        rotate,
        zIndex: cardList.length - index,
        scale: 1,
        opacity: 1,
      }}
      drag={isTop ? true : false}
      dragConstraints={false}
      dragMomentum={false}
      onDragEnd={(_event, info) => {
        if (!isTop) return

        const offsetX = info.offset.x
        const offsetY = info.offset.y

        const voteChoice =
          offsetX > 150 ? '찬성' : offsetX < -150 ? '반대' : offsetY < -150 ? '기권' : null

        if (voteChoice) {
          handleSwipe(voteChoice, offsetX, offsetY)
        } else {
          animate(x, 0, { duration: 0.2 })
          animate(y, 0, { duration: 0.2 })
        }
      }}
    >
      <VoteCard {...vote} />
    </motion.div>
  )
})

export default SwipeCard
