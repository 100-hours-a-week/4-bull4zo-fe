import { VoteChoice } from '@/api/services/vote/model'
import DisLikeIcon from '@/assets/dislike.svg?react'
import LikeIcon from '@/assets/like.svg?react'
import PassIcon from '@/assets/pass.svg?react'
import { Icon } from '@/components/Icon/icon'

type Props = {
  swipeDir: VoteChoice
  // eslint-disable-next-line no-unused-vars
  onSwipe: (dir: VoteChoice) => void
}

export const VoteDirectionButtonGroup = ({ swipeDir, onSwipe }: Props) => {
  const getClass = (dir: VoteChoice) =>
    `cursor-pointer transition-transform duration-200 ${swipeDir === dir ? 'scale-125' : ''}`

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[50] flex gap-5">
      {(swipeDir === null || swipeDir === '반대') && (
        <button className={getClass('반대')} onClick={() => onSwipe('반대')}>
          <Icon component={DisLikeIcon} className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '기권') && (
        <button className={getClass('기권')} onClick={() => onSwipe('기권')}>
          <Icon component={PassIcon} className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '찬성') && (
        <button className={getClass('찬성')} onClick={() => onSwipe('찬성')}>
          <Icon component={LikeIcon} className="w-16 h-16" />
        </button>
      )}
    </div>
  )
}
