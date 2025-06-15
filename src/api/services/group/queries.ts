import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  GroupRoleChangeRequest,
  GroupVoteListResponse,
  MyGroupList,
  MyGroupNamesData,
  UpdateGroupRequest,
} from './model'
import { groupService } from './service'

// 그룹 이름 무한스크롤 조회
export const useInfiniteGroupNameListQuery = (size: number = 10, enabled: boolean = true) => {
  return useInfiniteQuery<MyGroupNamesData, AxiosError>({
    queryKey: ['groupNameList'],
    queryFn: ({ pageParam }) => groupService.groupNameList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    enabled,
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
// 그룹 정보 무한스크롤 조회
export const useInfiniteGroupsQuery = (size: number = 10, enabled: boolean = true) => {
  return useInfiniteQuery<MyGroupList, Error>({
    queryKey: ['myGroups'],
    queryFn: ({ pageParam }) => groupService.getAllGroupList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 15,
    enabled,
  })
}
// 초대 코드로 그룹 가입
export const useInviteCodeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: groupService.joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
      queryClient.invalidateQueries({ queryKey: ['groupNameList'] })
    },
  })
}
// 그룹 생성
export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
      queryClient.invalidateQueries({ queryKey: ['groupNameList'] })
    },
  })
}
// 그룹 탈퇴(본인)
export const useLeaveGroupMutation = (groupId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => groupService.leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
      queryClient.invalidateQueries({ queryKey: ['groupNameList'] })
    },
  })
}
// 그룹 정보 조회
export const useGroupQuery = (groupId: number) => {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => groupService.getGroup(groupId),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  })
}
// 그룹 정보 수정
export const useUpdateGroupMutation = (groupId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateGroupRequest) => groupService.updateGroup(payload, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] })
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
      queryClient.invalidateQueries({ queryKey: ['groupNameList'] })
    },
  })
}
// 그룹 삭제
export const useDeleteGroupMutation = (groupId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => groupService.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
      queryClient.invalidateQueries({ queryKey: ['groupNameList'] })
    },
  })
}
// 그룹 멤버 목록 조회
export const useGroupMembersQuery = (groupId: number) => {
  return useQuery({
    queryKey: ['groupMembers', groupId],
    queryFn: () => groupService.getGroupMembers(groupId),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  })
}
// 그룹 멤버 역할 변경
export const useGroupRoleChangeMutation = (groupId: number, userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: GroupRoleChangeRequest) =>
      groupService.updateGroupMemberRole(groupId, userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMembers', groupId] })
      queryClient.invalidateQueries({ queryKey: ['group', groupId] })
    },
  })
}
// 그룹 멤버 삭제
export const useGroupMemberDeleteMutation = (groupId: number, userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => groupService.deleteGroupMember(groupId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMembers', groupId] })
      queryClient.invalidateQueries({ queryKey: ['group', groupId] })
    },
  })
}
// 그룹 내 투표 목록 조회
export const useGroupVotesInfiniteQuery = (groupId: number, size: number = 10) => {
  return useInfiniteQuery<GroupVoteListResponse, AxiosError>({
    queryKey: ['groupVotes', groupId],
    queryFn: ({ pageParam }) =>
      groupService.getGroupVotes(groupId, size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
