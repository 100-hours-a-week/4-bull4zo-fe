import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import HomePage from '@/pages/home/homePage'

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
])
