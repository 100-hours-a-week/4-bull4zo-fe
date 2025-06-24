import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteNotificationQuery } from '@/api/services/notification/queries'
import { NotificationItem } from '@/components/index'

interface Props {
  data: ReturnType<typeof useInfiniteNotificationQuery>['data']
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const NotificationList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <ol className="w-full">
      {data!.pages.map((page, pageIndex) =>
        page.notifications.map((notification, index) => {
          const isLast =
            pageIndex === data!.pages.length - 1 && index === page.notifications.length - 1

          return (
            <NotificationItem
              key={notification.notificationId}
              ref={isLast ? ref : undefined}
              {...notification}
            />
          )
        }),
      )}
    </ol>
  )
}
