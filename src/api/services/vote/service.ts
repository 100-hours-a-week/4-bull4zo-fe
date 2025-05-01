import { authAxiosInstance } from '@/api/axios'
import { DuringVoteDataResponse, UseInfiniteVotesRequest, submitVoteRequest } from './model'

export const voteService = {
  async getVotes({
    groupId,
    cursor,
    size = 10,
  }: UseInfiniteVotesRequest): Promise<DuringVoteDataResponse> {
    const params = new URLSearchParams()

    if (groupId !== undefined) params.append('groupId', groupId.toString())
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`api/v1/votes?${params.toString()}`)).data
  },
  async submitVote({ voteId, userResponse }: submitVoteRequest) {
    const response = await authAxiosInstance.post(`api/v1/votes/${voteId}/submit`, { userResponse })
    return response.data
  },
}
