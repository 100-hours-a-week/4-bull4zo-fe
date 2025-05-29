import { PageNation } from '@/types'

export type VoteType = 'USER' | 'AI' | 'EVENT'

export type VoteChoice = '찬성' | '반대' | '기권' | null

export interface Vote {
  voteId: number
  groupId: number
  groupName: string
  authorNickname: string
  content: string
  imageUrl: string
  imageName: string
  createdAt: string
  closedAt: string
  adminVote: 0 | 1 // 0이면 admin, 1이면 아님
  voteType: VoteType
}

export type VoteData = PageNation<'votes', Vote[]>

export interface UseInfiniteVotesQueryOptions {
  groupId?: number
  size?: number
  isLogin: boolean | undefined
}

export interface UseInfiniteVotesRequest {
  groupId: number | undefined
  size?: number
  cursor: string | undefined
}

export interface submitVoteRequest {
  voteId: number
  userResponse: number
}

export interface CreateVotePayload {
  groupId: number
  content: string
  imageUrl?: string
  imageName?: string
  closedAt: string
  anonymous: boolean
}

export interface ParticipatedVotesQueryOptions {
  groupId: number | undefined
  size?: number
}

export type ParticipatedVoteList = PageNation<'votes', ParticipatedVote[]>

export interface ParticipatedVote {
  voteId: number
  groupId: number
  content: string
  voteStatus?: ParticipatedVoteStatus
  createdAt: string
  closedAt: string
  results: ParticipatedVoteResult[]
  comments: number
}

export type ParticipatedVoteStatus = 'OPEN' | 'CLOSED' | 'REJECTED' | 'PENDING'

export interface ParticipatedVoteResult {
  optionNumber: number
  count: number
  ratio: number // 0 ~ 100
}

export interface VoteDetail {
  voteId: number
  groupId: number
  authorNickname: string
  content: string
  imageUrl: string
  imageName: string
  createdAt: string
  closedAt: string
  adminVote: number
}

export interface voteDetailResult {
  voteId: number
  userResponse: number | null
  totalCount: number
  results: ParticipatedVoteResult[]
}

// 투표 신고 사유 Response
export interface VoteReportReason {
  voteId: number
  reviewReason: string
}
