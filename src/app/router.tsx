import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import HomePage from '@/pages/home/homePage'
import LoginPage from '@/pages/login/loginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
