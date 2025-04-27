import { useEffect, useState } from 'react'

export const initMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_PUBLIC_MSW === 'enable') {
    const { worker } = await import('../mocks/worker/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const setup = async () => {
      await initMsw()
      setMswReady(true)
    }
    setup()
  }, [])

  if (!mswReady) {
    return null
  }

  return <>{children}</>
}
