import { create } from 'zustand'

interface UserStore {
  isLogin: boolean
  accessToken: string
  // eslint-disable-next-line no-unused-vars
  setIsLogin: (isLogin: boolean) => void
  // eslint-disable-next-line no-unused-vars
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  accessToken: '',
  setIsLogin: (isLogin) => set({ isLogin }),
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ isLogin: false, accessToken: '' }),
}))
