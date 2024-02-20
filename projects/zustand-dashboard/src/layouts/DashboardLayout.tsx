import { Navigate, Outlet } from 'react-router-dom'
import { SideMenu } from '../components'
import { useAuthStore } from '../stores'

export default function DashboardLayout() {
  const authStatus = useAuthStore((state) => state.status)
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)

  if (authStatus === 'pending') {
    checkAuthStatus()

    return (
      <p>Loading...</p>
    )
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to='/auth/login' replace />
  }

  return (
    <div className='bg-slate-200 overflow-y-scroll w-full h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-row relative w-full'>
        <SideMenu />

        <div className='w-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
