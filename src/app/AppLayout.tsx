import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/header/header'
import Navigation from '@/components/navigation/navigation'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'

export const AppLayout = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const { setTab } = useNavigationStore()
  const { isLogin } = useUserStore()

  useEffect(() => {
    if (!isLogin) {
      navigation('/home')
    }
    setTab(location.pathname)
  }, [location.pathname, setTab, isLogin, navigation])

  return (
    <>
      <Header />
      <main className="py-[4.25rem] h-screen">
        <Outlet />
      </main>
      <Navigation />
    </>
  )
}
