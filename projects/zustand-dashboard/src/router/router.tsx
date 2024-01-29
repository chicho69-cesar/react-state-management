import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { AuthLayout, DashboardLayout } from '../layouts'
import { BearPage, DashboardPage, JiraPage, LoginPage, PersonPage, WeddingInvitationPage } from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Dashboard routes
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <DashboardPage />
          },
          {
            path: 'bears',
            element: <BearPage />
          },
          {
            path: 'person',
            element: <PersonPage />
          },
          {
            path: 'tasks',
            element: <JiraPage />
          },
          {
            path: 'wedding-invitation',
            element: <WeddingInvitationPage />
          }
        ]
      },

      // Auth routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          }
        ]
      }
    ]
  }
])
