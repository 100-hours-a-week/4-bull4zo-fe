import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParticipatedVote, ParticipatedVoteStatus } from '@/api/services/vote/model'
import formatTime from '@/lib/formatTime'
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
      }}
      className={`flex flex-col px-4 py-6 border-[0.125rem] min-h-28 rounded-2xl gap-4 shadow-box ${vote.voteStatus === 'REJECTED' ? 'bg-red-200 cursor-not-allowed' : vote.voteStatus === 'PENDING' ? 'bg-zinc-200 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex flex-row items-center justify-between relative">
        <Label className="font-bold text-lg line-clamp-1">{vote.content}</Label>
        {vote.voteStatus && <VoteStatusLabel status={vote.voteStatus} />}
      </div>
      {!['REJECTED', 'PENDING'].includes(vote.voteStatus as string) && (
        <div className="flex items-center justify-end text-xs">
          {formatTime(vote.closedAt as string)}
        </div>
      )}
      {!['REJECTED', 'PENDING'].includes(vote.voteStatus as string) && (
        <div
          className={`relative h-6 w-full rounded ${vote.results && 'bg-gray-200'} overflow-hidden`}
        >
          {(agree?.count as number) > 0 && (
            <div
              className="absolute right-0 top-0 h-full items-center justify-center bg-green-500"
              style={{ width: `${Math.round(agree?.ratio as number)}%` }}
            >
              <ResultLabel>Yes</ResultLabel>
            </div>
          )}
          {(disagree?.count as number) > 0 && (
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{ width: `${Math.round(disagree?.ratio as number)}%` }}
            >
              <ResultLabel>No</ResultLabel>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

const ResultLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Label className="text-xs text-center h-full text-white justify-center items-center">
      {children}
    </Label>
  )
}
const VoteStatusLabel: React.FC<{ status: ParticipatedVoteStatus }> = ({ status }) => {
  const [open, setOpen] = useState(false)

  if (status === 'CLOSED') {
    return (
      <Label className="flex h-full justify-center items-center text-blue-400 min-w-16">
        <div className="flex h-3 w-3 rounded-full bg-blue-400" /> 종료됨
      </Label>
    )
  }
  if (status === 'OPEN') {
    return (
      <Label className="flex h-full justify-center items-center text-emerald-400 min-w-16">
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
        className="flex h-full justify-center items-center text-zinc-500 cursor-help min-w-16"
      >
        검토중
        <div className="flex h-3 w-3 rounded-full bg-zinc-400 text-[0.875rem] justify-center items-center text-white font-bold">
          <span className=" translate-y-[0.0625rem]">?</span>
        </div>
        {open && <StatusTooltip />}
      </Label>
    )
  }
  if (status === 'REJECTED') {
    return (
      <Label className="flex h-full justify-center items-center text-red-400 min-w-16 cursor-not-allowed">
        등록 실패
      </Label>
    )
  }
}
const StatusTooltip = () => {
  return (
    <div className="absolute top-4 right-0 z-10 bg-zinc-400 text-white text-xs rounded p-2 shadow-lg">
      작성하신 투표는 부적절한 내용이 없는지 <br />
      간단히 검토한 뒤 공개돼요. <br />
      10초 이내로 <span className="text-emerald-200">"진행중"</span>
      으로 전환됩니다.
    </div>
  )
}
