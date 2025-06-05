import { authAxiosInstance } from '@/api/axios'
import {
  CreateGroupData,
  CreateGroupPayload,
  Group,
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
}
