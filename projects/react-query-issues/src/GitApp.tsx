import { Outlet } from 'react-router-dom'

export function GitApp() {
  return (
    <div className='container mt-3'>
      <h1>Git Issues <small>Seguimiento de problemas</small></h1>
      <Outlet />
    </div>
  )
}
