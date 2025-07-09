import { createQueryKey } from '@/lib/createQueryKey'

// 투표 정보 key
export const votesKey = createQueryKey('votes')
// 참여한 투표 key
export const participatedVotesKey = createQueryKey('participatedVotes')
// 생성한 투표 key
export const createdVotesKey = createQueryKey('createdVotes')
// 상세 투표 정보 key
export const voteDetailKey = createQueryKey('voteDetail')
// 투표 결과 정보 key
export const voteResultKey = createQueryKey('voteResult')
// 투표 실패 사유 정보 key
export const voteFailureReasonKey = createQueryKey('voteFailureReason')
// top3 투표 key
export const top3VoteKey = createQueryKey('top3Vote')
