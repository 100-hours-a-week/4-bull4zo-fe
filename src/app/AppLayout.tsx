import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserInfoQuery } from '@/api/services/user/queries'
import Header from '@/components/header/header'
import { SSEManager } from '@/components/manager/sseManager'
import { Modal } from '@/components/modal/modal'
import Navigation from '@/components/navigation/navigation'
import { Slider } from '@/components/slider/slider'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'
import TokenGate from './TokenGate'

export const AppLayout = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const { setTab } = useNavigationStore()
  const { isLogin, setNickName, accessToken } = useUserStore()

  const { data: user } = useUserInfoQuery({ enabled: !!accessToken })

  useEffect(() => {
    if (user?.nickname) {
      setNickName(user.nickname)
    }
  }, [user, setNickName])

  useEffect(() => {
    setTab(location.pathname)
  }, [location.pathname, setTab, isLogin, navigation])

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return

    const preserveScrollRoutes = ['/research']

    if (!preserveScrollRoutes.includes(location.pathname)) {
      main.scrollTop = 0
    }
  }, [location.pathname])

  return (
    <TokenGate>
      <Header />
      <main className="py-[4.25rem] min-h-screen bg-yellow">
        {/* <Suspense fallback={<LoadingPage />}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
      <Navigation />
      <Slider />
      <Modal />
      <SSEManager />
    </TokenGate>
  )
}
