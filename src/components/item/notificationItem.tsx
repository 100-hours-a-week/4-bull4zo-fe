import { forwardRef } from 'react'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { Notification, NotificationListResponse } from '@/api/services/notification/model'
import {
  InfiniteNotificationKey,
  useMutationReadNotification,
} from '@/api/services/notification/queries'
import { notificationMessageMap } from '@/lib/messageMap'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/utils/time'

export const NotificationItem = forwardRef<HTMLLIElement, Partial<Notification>>((props, ref) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    ...useMutationReadNotification,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: InfiniteNotificationKey })

      const previous =
        queryClient.getQueryData<InfiniteData<NotificationListResponse>>(InfiniteNotificationKey)

      queryClient.setQueryData<InfiniteData<NotificationListResponse>>(
        InfiniteNotificationKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((n) =>
                n.notificationId === notificationId ? { ...n, read: 1 } : n,
              ),
            })),
          }
        },
      )

      return { previous }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<InfiniteData<NotificationListResponse>>(
        InfiniteNotificationKey,
        context?.previous,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: InfiniteNotificationKey })
    },
  })

  const handleClick = async () => {
    if (props.notificationId) {
      await mutateAsync(props.notificationId)

      if (props.redirectUrl) {
        window.location.href = props.redirectUrl
      }
    }
  }

  return (
    <li
      ref={ref}
      className={cn(
        'w-full border-b border-gray-300 px-4 py-4',
        props.read ? 'bg-white' : 'bg-gray-100',
        props.redirectUrl ? 'cursor-pointer' : 'cursor-default',
      )}
      onClick={handleClick}
    >
      <div className="text-xs flex items-center justify-between mb-1">
        <span>{notificationMessageMap[props.type!]}</span>
        <span>{formatRelativeTime(props.createdAt!)}</span>
      </div>
      <p className="font-medium text-sm">{props.content}</p>
    </li>
  )
})
