import { PageNation } from '@/types'

export type NotificationType =
  | 'MY_VOTE_CLOSED'
  | 'SUBMITTED_VOTE_CLOSED'
  | 'VOTE_APPROVED'
  | 'VOTE_REJECTED'
  | 'MY_VOTE_COMMENT'
  | 'TOP3_UPDATED'
  | 'GROUP_DELETED'

export interface Notification {
  notificationId: number
  type: NotificationType
  content: string
  read: number // 0: unread, 1: read
  redirectUrl: string
  createdAt: string
}

export type NotificationListResponse = PageNation<'notifications', Notification[]>

export interface NotificationReadResponse {
  notificationId: number
}

export interface NotificationSSEResponse {
  notificationId: number
  type: NotificationType
  content: string
  isRead: number
  redirectUrl: string
  createdAt: string
}
