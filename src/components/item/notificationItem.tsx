import { forwardRef } from 'react'
import { Notification } from '@/api/services/notification/model'
import { useMutationReadNotification } from '@/api/services/notification/queries'
import { typeMap } from '@/lib/messageMap'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/utils/time'

export const NotificationItem = forwardRef<HTMLLIElement, Partial<Notification>>((props, ref) => {
  const { mutateAsync } = useMutationReadNotification()

  const handleClick = () => {
    if (props.notificationId) {
      mutateAsync(props.notificationId)

      if (props.redirect_url) {
        window.location.href = props.redirect_url
      }
    }
  }

  return (
    <li
      ref={ref}
      className={cn(
        'w-full border-b px-4 py-4 cursor-pointer',
        props.read ? 'bg-white' : 'bg-gray-100',
      )}
      onClick={handleClick}
    >
      <div className="text-xs flex items-center justify-between mb-1">
        <span>{typeMap[props.type!]}</span>
        <span>{formatRelativeTime(props.createdAt!)}</span>
      </div>
      <p className="font-medium text-sm">{props.content}</p>
    </li>
  )
})
