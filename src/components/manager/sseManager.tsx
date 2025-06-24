import { useEffect, useState } from 'react'
import { useSSE } from '@/hooks/index'
import { useUserStore } from '@/stores/index'

export const SSEManager = () => {
  const { accessToken, isLogin } = useUserStore()
  const [shouldConnect, setShouldConnect] = useState(false)

  useEffect(() => {
    if (!isLogin || !accessToken) return

    const timeout = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setShouldConnect(true))
      } else {
        setShouldConnect(true)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [accessToken, isLogin])

  useSSE(shouldConnect ? accessToken : null)

  return null
}
