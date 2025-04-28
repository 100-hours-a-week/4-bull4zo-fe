import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './app/AppProvider'
import { router } from './app/router'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
