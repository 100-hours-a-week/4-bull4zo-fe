import { create } from 'zustand'

interface UserStore {
  isLogin: boolean | undefined
  nickname: string
  accessToken: string
  // eslint-disable-next-line no-unused-vars
  setIsLogin: (isLogin: boolean) => void
  // eslint-disable-next-line no-unused-vars
  setNickName: (nickname: string) => void
  // eslint-disable-next-line no-unused-vars
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: undefined,
  accessToken: '',
  nickname: '',
  setIsLogin: (isLogin) => set({ isLogin }),
  setNickName: (nickname) => set({ nickname: nickname }),
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ isLogin: false, accessToken: '' }),
}))
