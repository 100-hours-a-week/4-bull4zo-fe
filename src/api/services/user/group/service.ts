import { authAxiosInstance } from '@/api/axios'

export const groupService = {
  async groupNameList(size: number, cursor?: string) {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/user/groups/names?${params.toString()}`)).data
  },
}
