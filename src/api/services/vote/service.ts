import { authAxiosInstance } from '@/api/axios'
import {
  CreateVotePayload,
  ParticipatedVoteList,
  UseInfiniteVotesRequest,
  VoteData,
  VoteDetail,
  VoteReportReason,
  submitVoteRequest,
  voteDetailResult,
} from './model'

export const voteService = {
  async getVotes({ groupId, cursor, size }: UseInfiniteVotesRequest): Promise<VoteData> {
    const params = new URLSearchParams()

    if (groupId !== 0 && groupId !== undefined) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes?${params.toString()}`)).data.data
  },
  async submitVote({ voteId, userResponse }: submitVoteRequest) {
    const response = await authAxiosInstance.post(`/api/v1/votes/${voteId}/submit`, {
      userResponse,
    })
    return response.data.data
  },
  async createVote(payload: CreateVotePayload) {
    const response = await authAxiosInstance.post(`/api/v1/votes`, payload)
    return response.data.data as { voteId: number }
  },
  async getParticipatedVotes({
    groupId,
    cursor,
    size,
  }: UseInfiniteVotesRequest): Promise<ParticipatedVoteList> {
    const params = new URLSearchParams()

    if (groupId) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/submit?${params.toString()}`)).data.data
  },
  async getCreatedVotes({
    groupId,
    cursor,
    size,
  }: UseInfiniteVotesRequest): Promise<ParticipatedVoteList> {
    const params = new URLSearchParams()

    if (groupId) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/mine?${params.toString()}`)).data.data
  },
  async getVote(voteId: string): Promise<VoteDetail> {
    const response = await authAxiosInstance.get(`/api/v1/votes/${voteId}`)
    return response.data.data
  },
  async getVoteResult(voteId: string): Promise<voteDetailResult> {
    const response = await authAxiosInstance.get(`/api/v1/votes/${voteId}/result`)
    return response.data.data
  },
  // 투표 실패 사유 조회
  async getVoteFailReason(voteId: string): Promise<VoteReportReason> {
    const response = await authAxiosInstance.get(`/api/v1/votes/${voteId}/review`)
    return response.data.data
  },
  // PATCH: 투표 수정
  async updateVote(voteId: string, payload: CreateVotePayload) {
    const response = await authAxiosInstance.patch(`/api/v1/votes/${voteId}`, payload)
    return response.data.data
  },
  // DELETE: 투표 삭제
  async deleteVote(voteId: string) {
    const response = await authAxiosInstance.delete(`/api/v1/votes/${voteId}`)
    return response.data.data
  },
}
