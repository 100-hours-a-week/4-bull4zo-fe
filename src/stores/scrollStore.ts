import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ScrollStore = {
  scrollMap: Record<string, number>
  // eslint-disable-next-line no-unused-vars
  setScroll: (path: string, y: number) => void
  // eslint-disable-next-line no-unused-vars
  getScroll: (path: string) => number
}

export const useScrollStore = create(
  persist<ScrollStore>(
    (set, get) => ({
      scrollMap: {},
      setScroll: (path, y) =>
        set((state) => ({
          scrollMap: {
            ...state.scrollMap,
            [path]: y,
          },
        })),
      getScroll: (path) => get().scrollMap[path] ?? 0,
    }),
    {
      name: 'scroll-storage',
    },
  ),
)
