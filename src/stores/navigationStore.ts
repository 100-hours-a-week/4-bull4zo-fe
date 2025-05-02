import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Tab = 'home' | 'make' | 'research' | 'user'

interface NavigationStore {
  tab: Tab
  // eslint-disable-next-line no-unused-vars
  setTab: (path: string) => void
  reset: () => void
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      tab: 'home',
      setTab: (path) => {
        const pathToTab: Record<string, Tab> = {
          '/home': 'home',
          '/make': 'make',
          '/research': 'research',
          '/user': 'user',
        }
        const matchingRoute = Object.keys(pathToTab).find((route) => path.startsWith(route))
        const tab = matchingRoute ? pathToTab[matchingRoute] : 'home'

        // Debugging log removed

        set({ tab })
      },
      reset: () => set({ tab: 'home' }),
    }),
    {
      name: 'home',
    },
  ),
)
