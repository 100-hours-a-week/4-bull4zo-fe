import React from 'react'
import { MSWProvider } from './MSWProvider'
import { QueryProvider } from './QueryProvider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <MSWProvider>
      <QueryProvider>{children}</QueryProvider>
    </MSWProvider>
  )
}
