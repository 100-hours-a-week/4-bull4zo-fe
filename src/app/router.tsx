import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home/homePage'
import LoginPage from '@/pages/login/loginPage'
import { AppLayout } from './AppLayout'

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
