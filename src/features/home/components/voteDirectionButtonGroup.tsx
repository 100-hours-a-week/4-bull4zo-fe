import { VoteChoice } from '@/api/services/vote/model'
import DisLikeIcon from '@/assets/dislike.svg'
import LikeIcon from '@/assets/like.svg'
import PassIcon from '@/assets/pass.svg'

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
          <img src={DisLikeIcon} alt="반대" className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '기권') && (
        <button className={getClass('기권')} onClick={() => onSwipe('기권')}>
          <img src={PassIcon} alt="기권" className="w-16 h-16" />
        </button>
      )}
      {(swipeDir === null || swipeDir === '찬성') && (
        <button className={getClass('찬성')} onClick={() => onSwipe('찬성')}>
          <img src={LikeIcon} alt="찬성" className="w-16 h-16" />
        </button>
      )}
    </div>
  )
}
