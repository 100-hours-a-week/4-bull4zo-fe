import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { userService } from '@/api/services/user/service'
import Header from '@/components/header/header'
import Navigation from '@/components/navigation/navigation'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'

export const AppLayout = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const { setTab } = useNavigationStore()
  const { isLogin, setAccessToken, accessToken } = useUserStore()

  useEffect(() => {
    if (!isLogin) {
      navigation('/home')
    }
    setTab(location.pathname)
  }, [location.pathname, setTab, isLogin, navigation])

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!accessToken) {
        try {
          const newAccessToken = await userService.refreshAccessToken()
          setAccessToken(newAccessToken)
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          navigation('/home')
          return
        }
      }
    }

    checkAndRefreshToken()
    setTab(location.pathname)
  }, [location.pathname, setTab, navigation, setAccessToken])

  return (
    <>
      <Header />
      <main className="py-[4.25rem] min-h-screen bg-white">
        <Outlet />
      </main>
      <Navigation />
    </>
  )
}
