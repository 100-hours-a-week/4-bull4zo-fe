import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/api/services/user/queries'
import { TokenGate } from '@/app/index'
import { Header, Modal, Navigation, SSEManager, Slider } from '@/components/index'
import { useNavigationStore, useUserStore } from '@/stores/index'

export const AppLayout = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const setTab = useNavigationStore((state) => state.setTab)
  const isLogin = useUserStore((state) => state.isLogin)
  const setNickname = useUserStore((state) => state.setNickName)
  const accessToken = useUserStore((state) => state.accessToken)

  const { data: user } = useQuery(userQueryOptions({ enabled: !!accessToken }))

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname)
    }
  }, [user, setNickname])

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
      <Header path={location.pathname} />
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
