import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  createdVotesKey,
  participatedVotesKey,
  top3VoteKey,
  voteDetailKey,
  voteFailureReasonKey,
  voteResultKey,
  votesKey,
} from './key'
import {
  CreateVotePayload,
  ParticipatedVoteList,
  ParticipatedVotesQueryOptions,
  TopVoteDay,
  UseInfiniteVotesQueryOptions,
  VoteData,
  VoteDetail,
  VoteReportReason,
  submitVoteRequest,
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

  return useSuspenseInfiniteQuery<VoteData, AxiosError>({
    queryKey: votesKey(effectiveGroupId, effectiveSize),
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
export const useSubmitVoteMutation = {
  mutationFn: (payload: submitVoteRequest) => voteService.submitVote(payload),
}
// 투표 생성
export const useCreateVoteMutation = {
  mutationFn: (payload: CreateVotePayload) => voteService.createVote(payload),
}
// 참여한 투표 조회
export const useParticipatedVotesInfinityQuery = ({
  groupId,
  size = 10,
}: ParticipatedVotesQueryOptions) => {
  return useSuspenseInfiniteQuery<ParticipatedVoteList, AxiosError>({
    queryKey: participatedVotesKey(groupId),
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
  return useSuspenseInfiniteQuery<ParticipatedVoteList, AxiosError>({
    queryKey: createdVotesKey(groupId),
    queryFn: ({ pageParam }) =>
      voteService.getCreatedVotes({ groupId, cursor: pageParam as string | undefined, size }),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  })
}
// 투표 상세 내용 조회
export const useVoteDetailInfo = (voteId: string) => {
  return useSuspenseQuery<VoteDetail>({
    queryKey: voteDetailKey(voteId),
    queryFn: () => voteService.getVote(voteId),
    staleTime: 1000 * 60 * 1,
  })
}
// 투표 상세 결과 조회
export const useVoteDetailResults = (voteId: string) => {
  return useSuspenseQuery<voteDetailResult>({
    queryKey: voteResultKey(voteId),
    queryFn: () => voteService.getVoteResult(voteId),
    staleTime: 1000 * 60 * 1,
  })
}
// 투표 실패 사유 조회
export const useVoteReportReasons = (voteId: string) => {
  return useSuspenseQuery<VoteReportReason>({
    queryKey: voteFailureReasonKey(voteId),
    queryFn: () => voteService.getVoteFailReason(voteId),
  })
}
// 투표 수정
export const useUpdateVoteMutation = (voteId: string) => {
  return {
    mutationFn: (payload: CreateVotePayload) => voteService.updateVote(voteId, payload),
  }
}
// 투표 삭제
export const useDeleteVoteMutation = {
  mutationFn: (voteId: string) => voteService.deleteVote(voteId),
}
// Top3 투표 조회
export const useTop3VotesQuery = (groupId: number, type: TopVoteDay = 'daily') => {
  return useSuspenseQuery({
    queryKey: top3VoteKey(groupId, type),
    queryFn: () => voteService.getTop3Votes(groupId, type),
    staleTime: 1000 * 60 * 60 * 23, // 23h: 매일 오전 9시 재요청
  })
}
