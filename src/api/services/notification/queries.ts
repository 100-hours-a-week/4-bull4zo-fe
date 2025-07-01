import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NotificationListResponse } from './model'
import { notificationService } from './service'

export const useInfiniteNotificationQuery = (size: number = 20, enabled: boolean = true) => {
  return useInfiniteQuery<NotificationListResponse, AxiosError>({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) =>
      notificationService.getNotificationList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    enabled,
    initialPageParam: undefined,
    refetchOnWindowFocus: true,
    // refetchIntervalInBackground: true,
    // refetchInterval: 1000 * 5,
  })
}
export const useMutationReadNotification = () => {
  return useMutation({
    mutationFn: (notificationId: number) => {
      return notificationService.readNotification(notificationId)
    },
  })
}
