import React from 'react'
import { FaRegComment } from 'react-icons/fa6'
import { MdHowToVote } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Top3VoteData } from '@/api/services/vote/model'
import { Label } from '@/components/index'
import { cn } from '@/lib/utils'

interface Props extends Partial<Top3VoteData> {
  rank: number
}

const rankMap = {
  1: {
    label: '🥇',
    medalText: '금메달',
    bgColor: 'bg-[#FFE28A]',
    textColor: 'text-[#9A6A00]',
  },
  2: {
    label: '🥈',
    medalText: '은메달',
    bgColor: 'bg-[#D6E4F0]',
    textColor: 'text-[#5A6D84]',
  },
  3: {
    label: '🥉',
    medalText: '동메달',
    bgColor: 'bg-[#F9D3B4]',
    textColor: 'text-[#B35B2A]',
  },
}

export const RankItem = React.memo(function RankItem(vote: Props) {
  const navigation = useNavigate()

  return (
    <li
      onClick={() => {
        navigation(`/research/${vote.voteId}`)
      }}
      className={cn(
        'flex flex-col px-7 cursor-pointer bg-white py-4 rounded-[16px] shadow-md',
        `${rankMap[vote.rank as keyof typeof rankMap].bgColor}`,
      )}
    >
      <div className="flex flex-row justify-between relative">
        <Label
          className={cn(
            'font-medium text-lg line-clamp-1',
            vote.rank && `${rankMap[vote.rank as keyof typeof rankMap].textColor}`,
          )}
        >
          {`${rankMap[vote.rank as keyof typeof rankMap].label} `}
          {vote.content}
        </Label>
        <div className="flex flex-row gap-2 text-xs">
          <div
            className={cn(
              'flex flex-row items-center gap-[2px]',
              `${rankMap[vote.rank as keyof typeof rankMap].textColor}`,
            )}
          >
            <MdHowToVote />
            {vote.responsesCount}
          </div>
          <div
            className={cn(
              'flex flex-row items-center gap-[2px]',
              `${rankMap[vote.rank as keyof typeof rankMap].textColor}`,
            )}
          >
            <FaRegComment />
            {vote.commentsCount}
          </div>
        </div>
      </div>
    </li>
  )
})
