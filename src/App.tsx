import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import '@/styles/layout.css'
import { AppProvider } from './app/AppProvider'
import { router } from './app/router'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </AppProvider>
  )
}

export default App
