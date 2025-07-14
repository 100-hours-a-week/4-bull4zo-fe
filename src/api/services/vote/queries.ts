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
  submitVoteRequest,
} from './model'
import { voteService } from './service'

// 진행중인 투표 조회 options
export const infiniteVotesQueryOptions = ({
  groupId,
  size = 10,
  isLogin,
}: UseInfiniteVotesQueryOptions) => {
  const effectiveSize = isLogin ? size : 3
  const effectiveGroupId = isLogin ? groupId : 1

  return {
    queryKey: votesKey(effectiveGroupId, effectiveSize),
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      voteService.getVotes({
        groupId: effectiveGroupId,
        size: effectiveSize,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage: VoteData) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  }
}
// 투표 참여 mutation
export const useSubmitVoteMutation = {
  mutationFn: (payload: submitVoteRequest) => voteService.submitVote(payload),
}
// 투표 생성 mutation
export const useCreateVoteMutation = {
  mutationFn: (payload: CreateVotePayload) => voteService.createVote(payload),
}
// 참여한 투표 조회 options
export const infinityParticipatedVotesQueryOptions = ({
  groupId,
  size = 10,
}: ParticipatedVotesQueryOptions) => ({
  queryKey: participatedVotesKey(groupId),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    voteService.getParticipatedVotes({ groupId, cursor: pageParam, size }),
  getNextPageParam: (lastPage: ParticipatedVoteList) =>
    lastPage?.hasNext ? lastPage.nextCursor : undefined,
  staleTime: 1000 * 60 * 5,
  initialPageParam: undefined,
})

// 생성한 투표 조회 options
export const infinityCreateVotesQueryOptions = ({
  groupId,
  size = 10,
}: ParticipatedVotesQueryOptions) => ({
  queryKey: createdVotesKey(groupId),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    voteService.getCreatedVotes({ groupId, cursor: pageParam, size }),
  getNextPageParam: (lastPage: ParticipatedVoteList) =>
    lastPage?.hasNext ? lastPage.nextCursor : undefined,
  staleTime: 1000 * 60 * 5,
  initialPageParam: undefined,
})

// 투표 상세 내용 조회 options
export const voteDetailQueryOptions = (voteId: string) => ({
  queryKey: voteDetailKey(voteId),
  queryFn: () => voteService.getVote(voteId),
  staleTime: 1000 * 60 * 1,
})
// 투표 상세 결과 조회 options
export const voteResultQueryOptions = (voteId: string) => ({
  queryKey: voteResultKey(voteId),
  queryFn: () => voteService.getVoteResult(voteId),
  staleTime: 1000 * 60 * 1,
})
// 투표 실패 사유 조회 options
export const voteReportReasonQueryOptions = (voteId: string) => ({
  queryKey: voteFailureReasonKey(voteId),
  queryFn: () => voteService.getVoteFailReason(voteId),
})

// 투표 수정 mutation
export const useUpdateVoteMutation = (voteId: string) => {
  return {
    mutationFn: (payload: CreateVotePayload) => voteService.updateVote(voteId, payload),
  }
}
// 투표 삭제 mutation
export const useDeleteVoteMutation = {
  mutationFn: (voteId: string) => voteService.deleteVote(voteId),
}
// Top3 투표 조회 options
export const top3VotesQueryOptions = (groupId: number, type: TopVoteDay = 'daily') => ({
  queryKey: top3VoteKey(groupId, type),
  queryFn: () => voteService.getTop3Votes(groupId, type),
  staleTime: 1000 * 60 * 60 * 23, // 23h: 매일 오전 9시 재요청
})
