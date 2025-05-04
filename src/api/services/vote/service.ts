import { authAxiosInstance } from '@/api/axios'
import {
  CreateVotePayload,
  DuringVoteDataResponse,
  ParticipatedVotesResponse,
  UseInfiniteVotesRequest,
  submitVoteRequest,
} from './model'

export const voteService = {
  async getVotes({
    groupId,
    cursor,
    size,
  }: UseInfiniteVotesRequest): Promise<DuringVoteDataResponse> {
    const params = new URLSearchParams()

    if (groupId !== undefined) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes?${params.toString()}`)).data
  },
  async submitVote({ voteId, userResponse }: submitVoteRequest) {
    const response = await authAxiosInstance.post(`/api/v1/votes/${voteId}/submit`, {
      userResponse,
    })
    return response.data
  },
  async createVote(payload: CreateVotePayload) {
    const response = await authAxiosInstance.post(`/api/v1/votes`, payload)
    return response.data.data as { voteId: number }
  },
  async getParticipatedVotes({
    groupId,
    cursor,
    size,
  }: UseInfiniteVotesRequest): Promise<ParticipatedVotesResponse> {
    const params = new URLSearchParams()

    if (groupId) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/submit?${params.toString()}`)).data
  },
  async getCreatedVotes({
    groupId,
    cursor,
    size,
  }: UseInfiniteVotesRequest): Promise<ParticipatedVotesResponse> {
    const params = new URLSearchParams()

    if (groupId) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/mine?${params.toString()}`)).data
  },
}
