import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import '@/styles/layout.css'
import { AppProvider } from './app/AppProvider'
import { router } from './app/router'
import MOA from '/images/home.png'

const App = () => {
  return (
    <AppProvider>
      <div className="layout justify-center lg:justify-normal">
        <div className="hidden lg:block max-w-[40vw] ml-[5vw]">
          <img src={MOA} alt="로고 설명 이미지" />
        </div>
        <div id="main-content" className="main-content">
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              duration: 2000,
            }}
          />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
