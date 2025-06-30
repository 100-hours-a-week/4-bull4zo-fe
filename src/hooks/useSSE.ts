import { useEffect, useRef } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { toast } from 'sonner'
import { NotificationSSEResponse } from '@/api/services/notification/model'
import { notificationMessageMap } from '@/lib/messageMap'
import { useNotificationStore } from '@/stores/notificationStore'
import { useSliderStore } from '@/stores/sliderStore'

export const useSSE = (accessToken: string | null) => {
  const lastEventIdRef = useRef<string | null>(null)
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null)

  useEffect(() => {
    if (!accessToken) return

    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

    const connect = () => {
      const es = new EventSourcePolyfill(`${baseURL}/api/v1/notifications/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(lastEventIdRef.current && { 'Last-Event-ID': lastEventIdRef.current }),
        },
      })

      eventSourceRef.current = es

      es.addEventListener('notification', (event: any) => {
        try {
          const { notificationId, type, content, redirectUrl } = JSON.parse(
            event.data,
          ) as NotificationSSEResponse
          lastEventIdRef.current = event.lastEventId

          const isSliderOpen = useSliderStore.getState().isOpen
          if (!isSliderOpen) {
            toast(`${notificationMessageMap[type]} 알림이 왔습니다.`, {
              description: content,
              ...(redirectUrl && {
                action: {
                  label: '확인',
                  onClick: () => {
                    window.location.href = redirectUrl
                  },
                },
              }),
            })
          }

          useNotificationStore.getState().setNotification(notificationId)
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error('알림 처리 중 오류가 발생했습니다.')
        }
      })

      es.onerror = () => {
        es.close()
        setTimeout(connect, 3000)
      }
    }

    connect()

    return () => {
      eventSourceRef.current?.close()
    }
  }, [accessToken])
}
