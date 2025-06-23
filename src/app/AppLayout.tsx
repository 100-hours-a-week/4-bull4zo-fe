import { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserInfoQuery } from '@/api/services/user/queries'
import { userService } from '@/api/services/user/service'
import Header from '@/components/header/header'
import { LoadingPage } from '@/components/loading/loadingPage'
import { Modal } from '@/components/modal/modal'
import Navigation from '@/components/navigation/navigation'
import { Slider } from '@/components/slider/slider'
import { useModalStore } from '@/stores/modalStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'
import NotFoundPage from './NotFound'
import ServerUnablePage from './ServerUnablePage'

export const AppLayout = () => {
  const navigation = useNavigate()
  const { setIsLogin, setAccessToken, accessToken } = useUserStore()
  const [refreshAttempted, setRefreshAttempted] = useState(false)

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!accessToken) {
        try {
          const newAccessToken = await userService.refreshAccessToken()
          setIsLogin(true)
          setAccessToken(newAccessToken.accessToken)
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          navigation('/login')
          return
        } finally {
          setRefreshAttempted(true)
        }
      } else {
        setRefreshAttempted(true)
      }
    }

    checkAndRefreshToken()
  }, [setAccessToken, setIsLogin, accessToken, navigation])

  if (!refreshAttempted) {
    return null
  }

  if (!accessToken) {
    return <ServerUnablePage />
  }

  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense fallback={<LoadingPage />}>
        <AppLayoutContent />
      </Suspense>
    </ErrorBoundary>
  )
}

const AppLayoutContent = () => {
  const location = useLocation()
  const { setTab } = useNavigationStore()
  const { isLogin, setNickName } = useUserStore()

  const { isOpen } = useModalStore()

  const { data: user } = useUserInfoQuery()

  useEffect(() => {
    if (user?.nickname) {
      setNickName(user.nickname)
    }
  }, [user, setNickName])

  useEffect(() => {
    setTab(location.pathname)
  }, [location.pathname, setTab, isLogin])

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return

    const preserveScrollRoutes = ['/research']

    if (!preserveScrollRoutes.includes(location.pathname)) {
      main.scrollTop = 0
    }
  }, [location.pathname])

  return (
    <div>
      <Header />
      <main className="py-[4.25rem] min-h-screen bg-yellow">{isLogin && <Outlet />}</main>
      <Navigation />
      <Slider />
      {isOpen && <Modal />}
    </div>
  )
}
