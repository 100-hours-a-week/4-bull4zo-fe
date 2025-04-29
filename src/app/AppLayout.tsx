import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserInfoQuery } from '@/api/services/user/quries'
import { userService } from '@/api/services/user/service'
import Header from '@/components/header/header'
import { Modal } from '@/components/modal/modal'
import Navigation from '@/components/navigation/navigation'
import { useModalStore } from '@/stores/modalStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'

export const AppLayout = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const { setTab } = useNavigationStore()
  const { isLogin, setIsLogin, setAccessToken, setNickName, accessToken } = useUserStore()
  const { isOpen } = useModalStore()

  const { data: user } = useUserInfoQuery({ enabled: !!accessToken })

  useEffect(() => {
    if (user?.nickname) {
      setNickName(user.nickname)
    }
  }, [user, setNickName])

  useEffect(() => {
    if (isLogin === undefined) return

    if (isLogin === false) {
      navigation('/home')
    }
    setTab(location.pathname)
  }, [location.pathname, setTab, isLogin, navigation])

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!accessToken) {
        try {
          const newAccessToken = await userService.refreshAccessToken()

          setIsLogin(true)
          setAccessToken(newAccessToken.accessToken)
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          navigation('/home')
          return
        }
      }
    }

    checkAndRefreshToken()
    setTab(location.pathname)
  }, [setTab, navigation, setAccessToken, setIsLogin, accessToken, location.pathname])

  return (
    <>
      <Header />
      <main className="py-[4.25rem] min-h-screen bg-white">
        <Outlet />
        {isOpen && <Modal />}
      </main>
      <Navigation />
    </>
  )
}
