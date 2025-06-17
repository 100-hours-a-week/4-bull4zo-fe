import React from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'

// lazy loading pages
export const HomePage = React.lazy(() => import('@/features/home/pages/homePage'))
export const LoginPage = React.lazy(() => import('@/features/login/pages/loginPage'))
export const MakePage = React.lazy(() => import('@/features/make/pages/makePage'))
export const UpdatePage = React.lazy(() => import('@/features/make/pages/updatePage'))
export const ResearchPage = React.lazy(() => import('@/features/research/pages/researchPage'))
export const ResearchDetailPage = React.lazy(
  () => import('@/features/research/pages/researchDetail.Page'),
)
export const CreateGroupPage = React.lazy(() => import('@/features/group/pages/createGrupPage'))
export const ManageGroupPage = React.lazy(() => import('@/features/group/pages/manageGroupPage'))
export const GroupVotesPage = React.lazy(() => import('@/features/group/pages/groupVotesPage'))
export const UserPage = React.lazy(() => import('@/features/user/pages/userPage'))
export const AuthCallback = React.lazy(() => import('@/features/login/pages/authCallback'))
export const NotFoundPage = React.lazy(() => import('@/app/NotFound'))

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
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/make',
        element: <MakePage />,
      },
      {
        path: '/make/:voteId',
        element: <UpdatePage />,
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
      {
        path: '/group/:groupId/votes',
        element: <GroupVotesPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
