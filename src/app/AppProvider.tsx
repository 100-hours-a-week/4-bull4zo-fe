import React from 'react'
import { MSWProvider } from './MSWProvider'
import { QueryProvider } from './QueryProvider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MSWProvider>
      <QueryProvider>{children}</QueryProvider>
    </MSWProvider>
  )
}
