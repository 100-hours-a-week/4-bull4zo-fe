import { InfiniteNotificationKey } from './key'
import { NotificationListResponse } from './model'
import { notificationService } from './service'

// 알림 목록 조회 options
export const infiniteNotificationQueryOptions = (enabled: boolean = true, size: number = 20) => ({
  queryKey: InfiniteNotificationKey(),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    notificationService.getNotificationList(size, pageParam as string | undefined),
  getNextPageParam: (lastPage: NotificationListResponse) => {
    return lastPage?.hasNext ? lastPage.nextCursor : undefined
  },
  enabled,
  initialPageParam: undefined,
  refetchOnWindowFocus: true,
})

// 알림 읽기 mutation
export const useReadNotificationMutation = {
  mutationFn: (notificationId: number) => {
    return notificationService.readNotification(notificationId)
  },
}
