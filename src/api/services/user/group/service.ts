import { authAxiosInstance } from '@/api/axios'
import {
  CreateGroupData,
  CreateGroupPayload,
  InviteCodePayload,
  InviteGroupData,
  MyGroupList,
  MyGroupNamesData,
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
}
