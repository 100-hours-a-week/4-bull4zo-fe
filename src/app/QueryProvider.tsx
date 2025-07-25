import React from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'
import { messageMap } from '@/lib/messageMap'

const errorHandler = (error: any) => {
  const status = error?.response?.status
  const message =
    error?.response?.data?.message || '문제가 발생했습니다. 잠시 후 다시 시도해주세요.'

  if (status === 400 || status === 403 || status === 404 || status === 409) {
    const userMessage = messageMap[message] || '서버측의 오류가 발생했습니다.'
    toast(userMessage.message, { id: userMessage.toastId })
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 1,
    },
  },
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorHandler,
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
