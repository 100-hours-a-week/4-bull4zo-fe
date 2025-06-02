import React, { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ParticipatedVote, ParticipatedVoteStatus } from '@/api/services/vote/model'
import { trackEvent } from '@/lib/trackEvent'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/utils/time'
import { Label } from '../ui/label'

export const VoteItem = (vote: Partial<ParticipatedVote>) => {
  const navigation = useNavigate()

  const agree = vote.results?.find((r) => r.optionNumber === 1)
  const disagree = vote.results?.find((r) => r.optionNumber === 2)

  return (
    <li
      onClick={() => {
        if (vote.voteStatus === 'PENDING' || vote.voteStatus === 'REJECTED') return
        navigation(`/research/${vote.voteId}`)
        trackEvent({
          cta_id: 'vote_detail',
          action: 'navigation',
          page: location.pathname,
        })
      }}
      className={cn(
        'flex flex-col px-7 bg-white pt-8 pb-4 min-h-26 rounded-[30px] gap-4 shadow-lg',
        {
          'bg-red-200 cursor-not-allowed': vote.voteStatus === 'REJECTED',
          'bg-zinc-200 cursor-not-allowed': vote.voteStatus === 'PENDING',
        },
      )}
    >
      <div className="flex flex-row justify-between relative">
        <Label className="font-medium text-lg line-clamp-2">{vote.content}</Label>
        {vote.voteStatus && <VoteStatusLabel status={vote.voteStatus} />}
      </div>
      {!['REJECTED', 'PENDING'].includes(vote.voteStatus as string) && (
        <div className="flex items-center justify-between text-xs">
          {formatRelativeTime(vote.closedAt as string)}
          {vote.comments && <span className="font-semibold">💬 {vote.comments}</span>}
        </div>
      )}
      {!['REJECTED', 'PENDING'].includes(vote.voteStatus as string) && (
        <div>
          <div
            data-testid="item-result"
            className={`relative h-3 w-full rounded-[50px] ${vote.results && 'bg-gray-200'} overflow-hidden`}
          >
            {(agree?.count as number) > 0 && (
              <div
                className="absolute right-0 top-0 h-full bg-green-500"
                style={{ width: `${Math.round(agree?.ratio as number) + 3}%` }}
              ></div>
            )}
            {(disagree?.count as number) > 0 && (
              <div
                className="absolute rounded-[50px] left-0 top-0 h-full bg-red-500"
                style={{ width: `${Math.round(disagree?.ratio as number)}%` }}
              ></div>
            )}
          </div>
          <div className="flex items-center justify-between font-normal text-xs mt-1 px-1">
            <span>{Math.round(disagree?.ratio!)}%</span>
            <span>{Math.round(agree?.ratio!)}%</span>
          </div>
        </div>
      )}
    </li>
  )
}

// const ResultLabel = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Label className="text-xs text-center h-full text-white justify-center items-center">
//       {children}
//     </Label>
//   )
// }
const VoteStatusLabel: React.FC<{ status: ParticipatedVoteStatus }> = ({ status }) => {
  const [open, setOpen] = useState(false)

  if (status === 'CLOSED') {
    return (
      <Label className="flex h-full pt-2 justify-center items-center text-blue-400 min-w-16">
        <div className="flex h-3 w-3 rounded-full bg-blue-400" /> 종료됨
      </Label>
    )
  }
  if (status === 'OPEN') {
    return (
      <Label className="flex h-full pt-2 justify-center items-center text-emerald-400 min-w-16">
        <div className="flex h-3 w-3 rounded-full bg-emerald-400" /> 진행중
      </Label>
    )
  }
  if (status === 'PENDING') {
    return (
      <Label
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setOpen(!open)
        }}
        className="flex h-full pt-2 justify-center items-center text-zinc-500 cursor-help min-w-16"
      >
        검토중
        <div className="flex h-3 w-3 rounded-full bg-zinc-400 text-[0.875rem] justify-center items-center text-white font-bold">
          <FaQuestionCircle className="w-full h-full" />
        </div>
        {open && <StatusTooltip />}
      </Label>
    )
  }
  if (status === 'REJECTED') {
    return (
      <Label className="flex h-full pt-2 justify-center items-center text-red-400 min-w-16 cursor-not-allowed">
        등록 실패
      </Label>
    )
  }
}
const StatusTooltip = () => {
  return (
    <div className="absolute top-6 right-0 z-10 bg-zinc-400 text-white text-xs rounded p-2 shadow-lg">
      작성하신 투표는 부적절한 내용이 없는지 <br />
      간단히 검토한 뒤 공개돼요. <br />
      10초 이내로 <span className="text-emerald-200">"진행중"</span>
      으로 전환됩니다.
    </div>
  )
}
