import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { InfiniteNotificationKey } from './key'
import { NotificationListResponse } from './model'
import { notificationService } from './service'

export const useInfiniteNotificationQuery = (enabled: boolean = true, size: number = 20) => {
  return useInfiniteQuery<NotificationListResponse, AxiosError>({
    queryKey: InfiniteNotificationKey(),
    queryFn: ({ pageParam }) =>
      notificationService.getNotificationList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    enabled,
    initialPageParam: undefined,
    refetchOnWindowFocus: true,
  })
}
// 알림 읽기 mutation
export const useReadNotificationMutation = {
  mutationFn: (notificationId: number) => {
    return notificationService.readNotification(notificationId)
  },
}
