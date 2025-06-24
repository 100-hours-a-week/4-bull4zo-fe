import { createQueryKey } from '@/lib/createQueryKey'

// 그룹 key
export const groupKey = createQueryKey('groups')
// 그룹 멤버 목록 key
export const groupMembersKey = createQueryKey('groupMembers')
// 그룹 투표 목록 key
export const groupVotesKey = createQueryKey('groupVotes')
// 그룹 분석 리포트 key
export const groupAnalysisKey = createQueryKey('groupAnalysis')
// 그룹 이름 목록 key
export const groupNameListKey = createQueryKey('groupNameList')
// 내 그룹 목록 key
export const myGroupsKey = createQueryKey('myGroups')
