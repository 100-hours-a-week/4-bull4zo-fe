import { create } from 'zustand'

type State = {
  lastNotificationId: number | null
  newNotification: boolean
  // eslint-disable-next-line no-unused-vars
  setNotification: (id: number) => void
  clearNotification: () => void
}

export const useNotificationStore = create<State>((set) => ({
  lastNotificationId: null,
  newNotification: false,
  setNotification: (id) => set({ lastNotificationId: id, newNotification: true }),
  clearNotification: () => set({ newNotification: false }),
}))
