import { Outlet } from 'react-router-dom'
import { SideMenu } from '../components'

export default function DashboardLayout() {
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