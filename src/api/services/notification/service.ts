import { authAxiosInstance } from '@/api/axios'
import { NotificationListResponse, NotificationReadResponse } from './model'

export const notificationService = {
  async getNotificationList(size: number, cursor?: string): Promise<NotificationListResponse> {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    const response = await authAxiosInstance.get(`/api/v1/notifications?${params.toString()}`)
    return response.data.data
  },
  async readNotification(notificationId: number): Promise<NotificationReadResponse> {
    const response = await authAxiosInstance.patch(`/api/v1/notifications/${notificationId}/read`)
    return response.data.data
  },
}
