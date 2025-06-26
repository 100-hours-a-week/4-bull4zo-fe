import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteNotificationQuery } from '@/api/services/notification/queries'
import { NotificationItem } from '../item/notificationItem'

interface Props {
  data: ReturnType<typeof useInfiniteNotificationQuery>['data']
  fetchNextPage: () => void
  hasNextPage: boolean
}

export const NotificationList = ({ data, fetchNextPage, hasNextPage }: Props) => {
  const { ref, inView } = useInView({
    rootMargin: '50px',
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
