import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParticipatedVote, ParticipatedVoteStatus } from '@/api/services/vote/model'
import formatTime from '@/lib/formatTime'
import { Label } from '../ui/label'

export const VoteItem = (vote: Partial<ParticipatedVote>) => {
  const navigation = useNavigate()

  return (
    <li
      onClick={() => navigation(`/research/${vote.voteId}`)}
      className={`flex flex-col px-2 py-3 border-[0.125rem] rounded-2xl gap-2 shadow-box ${vote.voteStatus === 'REJECTED' ? 'bg-red-200' : vote.voteStatus === 'PENDING' ? 'bg-zinc-200' : ''}`}
    >
      <div className="flex flex-row items-center justify-between relative">
        <Label className="font-bold line-clamp-2">{vote.content}</Label>
        {vote.voteStatus && <VoteStatusLabel status={vote.voteStatus} />}
      </div>
      <div className="flex items-center justify-end text-xs font-bold">
        {formatTime(vote.closedAt as string)}
      </div>
      <div className="relative h-6 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full items-center justify-center bg-green-500"
          style={{ width: `${vote.results?.find((r) => r.optionNumber === 1)?.ratio}%` }}
        >
          <ResultLabel>찬성</ResultLabel>
        </div>
        <div
          className="absolute right-0 top-0 h-full bg-red-500"
          style={{ width: `${vote.results?.find((r) => r.optionNumber === 2)?.ratio}%` }}
        >
          <ResultLabel>반대</ResultLabel>
        </div>
      </div>
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
      <Label className="flex h-full justify-center items-center text-blue-400">
        <div className="flex h-3 w-3 rounded-full bg-blue-400" /> 종료됨
      </Label>
    )
  }
  if (status === 'OPEN') {
    return (
      <Label className="flex h-full justify-center items-center text-emerald-400">
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
        className="flex h-full justify-center items-center text-zinc-500"
      >
        검토중
        <div className="flex h-3 w-3 rounded-full bg-zinc-400 text-[0.625rem] justify-center items-center text-white font-bold">
          <span>?</span>
        </div>
        {open && <StatusTooltip />}
      </Label>
    )
  }
  if (status === 'REJECTED') {
    return <Label className="flex h-full justify-center items-center text-red-400">등록 실패</Label>
  }
}
const StatusTooltip = () => {
  return (
    <div className="absolute top-4 right-0 z-10 bg-zinc-400 text-white text-xs rounded p-2 shadow-lg">
      작성하신 투표는 부적절한 내용이 없는지 <br />
      간단히 검토한 뒤 공개돼요. <br />약 20초 뒤 <span className="text-emerald-200">'진행중'</span>
      으로 전환됩니다.
    </div>
  )
}
