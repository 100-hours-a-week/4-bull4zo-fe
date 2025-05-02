import { Navigate, createBrowserRouter } from 'react-router-dom'
import HomePage from '@/features/home/pages/homePage'
import AuthCallback from '@/features/login/pages/authCallback'
import LoginPage from '@/features/login/pages/loginPage'
import MakePage from '@/features/make/pages/makePage'
import { AppLayout } from './AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/auth/callback',
        element: <AuthCallback />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/make',
        element: <MakePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
