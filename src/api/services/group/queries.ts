import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
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
  GroupAnalysisResponse,
  GroupRoleChangeRequest,
  GroupVoteListResponse,
  InviteCodePayload,
  MyGroupList,
  MyGroupNamesData,
  UpdateGroupRequest,
} from './model'
import { groupService } from './service'

// 그룹 이름 무한스크롤 조회
export const useInfiniteGroupNameListQuery = (size: number = 10) => {
  return useSuspenseInfiniteQuery<MyGroupNamesData, AxiosError>({
    queryKey: groupNameListKey(),
    queryFn: ({ pageParam }) => groupService.groupNameList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
// 그룹 정보 무한스크롤 조회
export const useInfiniteGroupsQuery = (size: number = 10) => {
  return useSuspenseInfiniteQuery<MyGroupList, Error>({
    queryKey: myGroupsKey(),
    queryFn: ({ pageParam }) => groupService.getAllGroupList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 15,
  })
}
// 초대 코드로 그룹 가입
export const useInviteCodeMutation = {
  mutationFn: (payload: InviteCodePayload) => {
    return groupService.joinGroup(payload)
  },
}
// 그룹 생성
export const useCreateGroupMutation = {
  mutationFn: (payload: CreateGroupPayload) => {
    return groupService.createGroup(payload)
  },
}
// 그룹 탈퇴(본인)
export const useLeaveGroupMutation = {
  mutationFn: (groupId: number) => groupService.leaveGroup(groupId),
}
// 그룹 정보 조회
export const useGroupQuery = (groupId: number) => {
  return useSuspenseQuery({
    queryKey: groupKey(groupId),
    queryFn: () => groupService.getGroup(groupId),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  })
}
// 그룹 정보 수정
export const useUpdateGroupMutation = (groupId: number) => {
  return {
    mutationFn: (payload: UpdateGroupRequest) => groupService.updateGroup(payload, groupId),
  }
}
// 그룹 삭제
export const useDeleteGroupMutation = {
  mutationFn: (groupId: number) => groupService.deleteGroup(groupId),
}
// 그룹 멤버 목록 조회
export const useGroupMembersQuery = (groupId: number) => {
  return useSuspenseQuery({
    queryKey: groupMembersKey(groupId),
    queryFn: () => groupService.getGroupMembers(groupId),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  })
}
// 그룹 멤버 역할 변경
export const useGroupRoleChangeMutation = (groupId: number, userId: number) => {
  return {
    mutationFn: (payload: GroupRoleChangeRequest) =>
      groupService.updateGroupMemberRole(groupId, userId, payload),
  }
}
// 그룹 멤버 추방
export const useGroupMemberDeleteMutation = (groupId: number, userId: number) => {
  return {
    mutationFn: () => groupService.deleteGroupMember(groupId, userId),
  }
}
// 그룹 내 투표 목록 조회
export const useGroupVotesInfiniteQuery = (groupId: number, size: number = 10) => {
  return useSuspenseInfiniteQuery<GroupVoteListResponse, AxiosError>({
    queryKey: groupVotesKey(groupId),
    queryFn: ({ pageParam }) =>
      groupService.getGroupVotes(groupId, size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
// 그룹 내 리포트 조회
export const useGroupAnalysisQuery = (groupId: number) => {
  return useSuspenseQuery<GroupAnalysisResponse, AxiosError>({
    queryKey: groupAnalysisKey(groupId),
    queryFn: () => groupService.getGroupReports(groupId),
    staleTime: 1000 * 60 * 60 * 24 * 6,
  })
}
