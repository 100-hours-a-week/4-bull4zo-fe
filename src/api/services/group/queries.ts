import { ParticipatedVoteList } from '../vote/model'
import {
  groupAnalysisKey,
  groupKey,
  groupMembersKey,
  groupNameListKey,
  groupVotesKey,
  myGroupsKey,
} from './key'
import {
  CreateGroupPayload,
  GroupRoleChangeRequest,
  InviteCodePayload,
  MyGroupList,
  MyGroupNamesData,
  UpdateGroupRequest,
} from './model'
import { groupService } from './service'

// 그룹 이름 리스트 조회 options
export const infiniteGroupNameListQueryOptions = (size: number = 10) => ({
  queryKey: groupNameListKey(),
  queryFn: ({ pageParam }: { pageParam?: string }) => groupService.groupNameList(size, pageParam),
  getNextPageParam: (lastPage: MyGroupNamesData) => {
    return lastPage?.hasNext ? lastPage.nextCursor : undefined
  },
  staleTime: 1000 * 60 * 15,
  initialPageParam: undefined,
})
// 그룹 정보 리스트 조회 options
export const infiniteGroupQueryOptions = (size: number = 10) => ({
  queryKey: myGroupsKey(),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    groupService.getAllGroupList(size, pageParam as string | undefined),
  getNextPageParam: (lastPage: MyGroupList) => {
    return lastPage?.hasNext ? lastPage.nextCursor : undefined
  },
  staleTime: 1000 * 60 * 15,
  initialPageParam: undefined,
})
// 초대 코드로 그룹 가입 mutation
export const useInviteCodeMutation = {
  mutationFn: (payload: InviteCodePayload) => {
    return groupService.joinGroup(payload)
  },
}
// 그룹 생성 mutation
export const useCreateGroupMutation = {
  mutationFn: (payload: CreateGroupPayload) => {
    return groupService.createGroup(payload)
  },
}
// 그룹 탈퇴(본인) mutation
export const useLeaveGroupMutation = {
  mutationFn: (groupId: number) => groupService.leaveGroup(groupId),
}
// 그룹 정보 조회 options
export const groupQueryOptions = (groupId: number) => ({
  queryKey: groupKey(groupId),
  queryFn: () => groupService.getGroup(groupId),
  staleTime: 1000 * 60 * 15,
  retry: 1,
})
// 그룹 정보 수정 mutation
export const useUpdateGroupMutation = (groupId: number) => {
  return {
    mutationFn: (payload: UpdateGroupRequest) => groupService.updateGroup(payload, groupId),
  }
}
// 그룹 삭제 mutation
export const useDeleteGroupMutation = {
  mutationFn: (groupId: number) => groupService.deleteGroup(groupId),
}
// 그룹 멤버 목록 조회 options
export const groupMemberQueryOptions = (groupId: number) => ({
  queryKey: groupMembersKey(groupId),
  queryFn: () => groupService.getGroupMembers(groupId),
  staleTime: 1000 * 60 * 15,
  retry: 1,
})

// 그룹 멤버 역할 변경 mutation
export const useGroupRoleChangeMutation = (groupId: number, userId: number) => {
  return {
    mutationFn: (payload: GroupRoleChangeRequest) =>
      groupService.updateGroupMemberRole(groupId, userId, payload),
  }
}
// 그룹 멤버 추방 mutation
export const useGroupMemberDeleteMutation = (groupId: number, userId: number) => {
  return {
    mutationFn: () => groupService.deleteGroupMember(groupId, userId),
  }
}
// 그룹 내 투표 목록 조회 options
export const infiniteGroupVotesQueryOptions = (groupId: number, size: number = 10) => ({
  queryKey: groupVotesKey(groupId),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    groupService.getGroupVotes(groupId, size, pageParam as string | undefined),
  getNextPageParam: (lastPage: ParticipatedVoteList) =>
    lastPage?.hasNext ? lastPage.nextCursor : undefined,
  staleTime: 1000 * 60 * 15,
  initialPageParam: undefined,
})

// 그룹 내 리포트 조회 options
export const groupAnalysisQueryOptions = (groupId: number) => ({
  queryKey: groupAnalysisKey(groupId),
  queryFn: () => groupService.getGroupReports(groupId),
  staleTime: 1000 * 60 * 60 * 24 * 6,
})
