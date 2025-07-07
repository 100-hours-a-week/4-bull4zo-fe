import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NotificationListResponse } from './model'
import { notificationService } from './service'

// 무한 스크롤 알림 조회 Key
export const InfiniteNotificationKey = ['notifications']

export const useInfiniteNotificationQuery = (enabled: boolean = true, size: number = 20) => {
  return useInfiniteQuery<NotificationListResponse, AxiosError>({
    queryKey: InfiniteNotificationKey,
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
export const useMutationReadNotification = {
  mutationFn: (notificationId: number) => {
    return notificationService.readNotification(notificationId)
  },
}
