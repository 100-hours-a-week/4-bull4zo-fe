import { create } from 'zustand'

// 스크롤 위치를 저장하는 key
type ScrollKey = 'research' | 'user' | 'group'
export const ScrollKeys = {
  research: 'research',
  user: 'user',
  group: 'group',
} as const

type ScrollStore = {
  scrollMap: Record<ScrollKey, number>
  // eslint-disable-next-line no-unused-vars
  setScroll: (path: ScrollKey, y: number) => void
  // eslint-disable-next-line no-unused-vars
  getScroll: (path: ScrollKey) => number
  reset: () => void
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  scrollMap: {
    research: 0,
    user: 0,
    group: 0,
  },
  setScroll: (key, y) =>
    set((state) => ({
      scrollMap: { ...state.scrollMap, [key]: y },
    })),
  getScroll: (key) => get().scrollMap[key] ?? 0,
  reset: () =>
    set({
      scrollMap: {
        research: 0,
        user: 0,
        group: 0,
      },
    }),
}))
