import { Outlet } from 'react-router-dom'
import Header from '@/components/header/header'
import Navigation from '@/components/navigation/navigation'

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="pb-[4.25rem]">
        <Outlet />
      </main>
      <Navigation />
    </>
  )
}
