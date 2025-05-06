import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  ParticipatedVoteList,
  ParticipatedVotesQueryOptions,
  UseInfiniteVotesQueryOptions,
  VoteData,
  VoteDetail,
  voteDetailResult,
} from './model'
import { voteService } from './service'

// 진행중인 투표 무한 스크롤
export const useInfiniteVotesQuery = ({
  groupId,
  size = 10,
  isLogin,
}: UseInfiniteVotesQueryOptions) => {
  const effectiveSize = isLogin ? size : 3
  const effectiveGroupId = isLogin ? groupId : 1

  return useInfiniteQuery<VoteData, AxiosError>({
    queryKey: ['votes', effectiveGroupId, effectiveSize],
    queryFn: ({ pageParam }) =>
      voteService.getVotes({
        groupId: effectiveGroupId,
        size: effectiveSize,
        cursor: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  })
}
// 투표 참여
export const useSubmitVoteMutation = () => {
  return useMutation({
    mutationFn: voteService.submitVote,
  })
}
// 투표 생성
export const useCreateVoteMutation = () => {
  return useMutation({
    mutationFn: voteService.createVote,
  })
}
// 참여한 투표 조회
export const useParticipatedVotesInfinityQuery = ({
  groupId,
  size = 10,
}: ParticipatedVotesQueryOptions) => {
  return useInfiniteQuery<ParticipatedVoteList, AxiosError>({
    queryKey: ['participatedVotes', groupId],
    queryFn: ({ pageParam }) =>
      voteService.getParticipatedVotes({ groupId, cursor: pageParam as string | undefined, size }),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  })
}
// 생성한 투표 조회
export const useCreateVotesInfinityQuery = ({
  groupId,
  size = 10,
}: ParticipatedVotesQueryOptions) => {
  return useInfiniteQuery<ParticipatedVoteList, AxiosError>({
    queryKey: ['createdVotes', groupId],
    queryFn: ({ pageParam }) =>
      voteService.getCreatedVotes({ groupId, cursor: pageParam as string | undefined, size }),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  })
}
// 투표 상세 내용 조회
export const useVoteDetailInfo = (voteId: string) => {
  return useQuery<VoteDetail>({
    queryKey: ['voteDetail', voteId],
    queryFn: () => voteService.getVote(voteId),
    enabled: !!voteId,
    staleTime: 1000 * 60 * 1,
  })
}
// 투표 상세 결과 조회
export const useVoteDetailResults = (voteId: string) => {
  return useQuery<voteDetailResult>({
    queryKey: ['voteResult', voteId],
    queryFn: () => voteService.getVoteResult(voteId),
    enabled: !!voteId,
    staleTime: 1000 * 60 * 1,
  })
}
