import { Navigate, createBrowserRouter } from 'react-router-dom'
import CreateGroupPage from '@/features/group/pages/createGrupPage'
import ManageGroupPage from '@/features/group/pages/manageGroupPage'
import HomePage from '@/features/home/pages/homePage'
import AuthCallback from '@/features/login/pages/authCallback'
import LoginPage from '@/features/login/pages/loginPage'
import MakePage from '@/features/make/pages/makePage'
import ResearchDetailPage from '@/features/research/pages/researchDetail.Page'
import ResearchPage from '@/features/research/pages/researchPage'
import UserPage from '@/features/user/pages/userPage'
import { AppLayout } from './AppLayout'
import NotFoundPage from './NotFound'

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
      {
        path: '/make/:voteId',
        element: <MakePage />,
      },
      {
        path: '/research',
        element: <ResearchPage />,
      },
      {
        path: '/research/:voteId',
        element: <ResearchDetailPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/group/create',
        element: <CreateGroupPage />,
      },
      {
        path: '/group/:groupId',
        element: <ManageGroupPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
