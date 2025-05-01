import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { DuringVoteDataResponse, UseInfiniteVotesQueryOptions } from './model'
import { voteService } from './service'

export const useInfiniteVotesQuery = ({
  groupId,
  size = 10,
  isLogin,
}: UseInfiniteVotesQueryOptions) => {
  const effectiveSize = isLogin ? size : 3
  const effectiveGroupId = isLogin ? groupId : 1

  return useInfiniteQuery<DuringVoteDataResponse, AxiosError>({
    queryKey: ['votes', effectiveGroupId, effectiveSize],
    queryFn: ({ pageParam }) =>
      voteService.getVotes({
        groupId: effectiveGroupId,
        size: effectiveSize,
        cursor: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  })
}
export const useSubmitVoteMutation = () => {
  return useMutation({
    mutationFn: voteService.submitVote,
  })
}
