import { Outlet } from 'react-router-dom'
import Header from '@/components/header/header'

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="pb-[4.25rem]">
        <Outlet />
      </main>
    </>
  )
}
