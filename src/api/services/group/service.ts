import { authAxiosInstance } from '@/api/axios'
import {
  CreateGroupData,
  CreateGroupPayload,
  Group,
  GroupAnalysisResponse,
  GroupMemberDeleteResponse,
  GroupMembersResponse,
  GroupRoleChangeRequest,
  GroupRoleChangeResponse,
  GroupVoteListResponse,
  InviteCodePayload,
  InviteGroupData,
  MyGroupList,
  MyGroupNamesData,
  UpdateGroupRequest,
} from './model'

export const groupService = {
  async groupNameList(size: number, cursor?: string): Promise<MyGroupNamesData> {
    const params = new URLSearchParams()

    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/user/groups/labels?${params.toString()}`)).data
      .data
  },
  async getAllGroupList(size: number, cursor?: string): Promise<MyGroupList> {
    const params = new URLSearchParams()
    params.append('size', size.toString())
    if (cursor) params.append('cursor', cursor)

    const response = await authAxiosInstance.get(`/api/v1/user/groups?${params.toString()}`)
    return response.data.data
  },
  async joinGroup(payload: InviteCodePayload): Promise<InviteGroupData> {
    const response = await authAxiosInstance.post(`/api/v1/groups/join`, payload)
    return response.data.data
  },
  async createGroup(payload: CreateGroupPayload): Promise<CreateGroupData> {
    const response = await authAxiosInstance.post(`/api/v1/groups`, payload)
    return response.data.data
  },
  // Delete: 그룹 탈퇴(본인)
  async leaveGroup(groupId: number): Promise<{ groupId: number }> {
    const response = await authAxiosInstance.delete(`/api/v1/groups/${groupId}/members/me`)
    return response.data.data
  },
  // Get: 그룹 정보 조회
  async getGroup(groupId: number): Promise<Group> {
    const response = await authAxiosInstance.get(`/api/v1/groups/${groupId}`)
    return response.data.data
  },
  // Patch: 그룹 정보 수정
  async updateGroup(payload: UpdateGroupRequest, groupId: number): Promise<Group> {
    const response = await authAxiosInstance.patch(`/api/v1/groups/${groupId}`, payload)
    return response.data.data
  },
  // Delete: 그룹 삭제
  async deleteGroup(groupId: number): Promise<{ groupId: number }> {
    const response = await authAxiosInstance.delete(`/api/v1/groups/${groupId}`)
    return response.data.data
  },
  // Get: 그룹 멤버 목록 조회
  async getGroupMembers(groupId: number): Promise<GroupMembersResponse> {
    const response = await authAxiosInstance.get(`/api/v1/groups/${groupId}/members`)
    return response.data.data
  },
  // Patch: 그룹 멤버 역할 변경
  async updateGroupMemberRole(
    groupId: number,
    userId: number,
    payload: GroupRoleChangeRequest,
  ): Promise<GroupRoleChangeResponse> {
    const response = await authAxiosInstance.patch(
      `/api/v1/groups/${groupId}/members/${userId}`,
      payload,
    )
    return response.data.data
  },
  // Delete: 그룹 멤버 삭제
  async deleteGroupMember(groupId: number, userId: number): Promise<GroupMemberDeleteResponse> {
    const response = await authAxiosInstance.delete(`/api/v1/groups/${groupId}/members/${userId}`)
    return response.data.data
  },
  // Get: 그룹 내 모든 투표 조회
  async getGroupVotes(
    groupId: number,
    size: number,
    cursor?: string,
  ): Promise<GroupVoteListResponse> {
    const params = new URLSearchParams()

    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    const response = await authAxiosInstance.get(
      `/api/v1/groups/${groupId}/votes?${params.toString()}`,
    )
    return response.data.data
  },
  // Get: 그룹 내 리포트 조회
  async getGroupReports(groupId: number): Promise<GroupAnalysisResponse> {
    const response = await authAxiosInstance.get(`/api/v1/groups/${groupId}/analysis`)
    return response.data.data
  },
}
