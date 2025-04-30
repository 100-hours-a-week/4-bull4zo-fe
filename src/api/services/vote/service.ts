import { authAxiosInstance } from '@/api/axios'
import { DuringVoteDataResponse, UseInfiniteVotesRequest } from './model'

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

    return (await authAxiosInstance.get(`/votes?${params.toString()}`)).data
  },
}
