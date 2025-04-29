export type VoteType = 'USER' | 'AI' | 'EVENT'

export interface Vote {
  voteId: number
  groupId: number
  authorNickname: string
  content: string
  imageUrl: string
  createdAt: string
  closedAt: string
  adminVote: 0 | 1 // 0이면 admin, 1이면 아님
  voteType: VoteType
}
export interface VoteData {
  votes: Vote[]
  nextCursor: string
  hasNext: boolean
  size: number
}

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
  closedAt: string
  anonymous: boolean
}

export interface ParticipatedVotesQueryOptions {
  groupId: number | undefined
  size?: number
}

export interface ParticipatedVoteList {
  votes: ParticipatedVote[]
  nextCursor: string
  hasNext: boolean
  size: number
}

export interface ParticipatedVote {
  voteId: number
  groupId: number
  content: string
  voteStatus?: ParticipatedVoteStatus
  createdAt: string
  closedAt: string
  results: ParticipatedVoteResult[]
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
