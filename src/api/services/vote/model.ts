import { ApiResponse } from '@/lib/type'

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
export type DuringVoteDataResponse = ApiResponse<VoteData>

export interface UseInfiniteVotesQueryOptions {
  groupId?: number
  size?: number
  isLogin: boolean
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
}
