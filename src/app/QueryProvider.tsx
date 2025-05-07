import React from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'
import { messageMap } from '@/lib/messageMap'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      const status = error?.response?.status
      const message =
        error?.response?.data?.message || '문제가 발생했습니다. 잠시 후 다시 시도해주세요.'

      if (status === 403) {
        toast('권한이 부족합니다.')
      }
      if (status === 404 || status === 409) {
        const userMessage = messageMap[message] || '서버측의 오류가 발생했습니다.'
        toast(userMessage)
      }
    },
  }),
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
