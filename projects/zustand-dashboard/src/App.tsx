import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <main>
      <Outlet />
    </main>
  )
}
