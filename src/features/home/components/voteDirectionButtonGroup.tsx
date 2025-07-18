import { VoteChoice } from '@/api/services/vote/model'
import DisLikeIcon from '@/assets/dislike.svg'
import LikeIcon from '@/assets/like.svg'
import PassIcon from '@/assets/pass.webp'
import { Icon } from '@/components/index'

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
        <button aria-label="반대 버튼" className={getClass('반대')} onClick={() => onSwipe('반대')}>
          <Icon alt="반대" src={DisLikeIcon} className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '기권') && (
        <button aria-label="기권 버튼" className={getClass('기권')} onClick={() => onSwipe('기권')}>
          <Icon alt="기권" src={PassIcon} className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '찬성') && (
        <button aria-label="찬성 버튼" className={getClass('찬성')} onClick={() => onSwipe('찬성')}>
          <Icon alt="찬성" src={LikeIcon} className="w-16 h-16" />
        </button>
      )}
    </div>
  )
}
