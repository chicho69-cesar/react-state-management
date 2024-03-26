import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom'

import { router } from './router/router.tsx'
import { TanStackProvider } from './plugins/TanStackProvider.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <TanStackProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </NextUIProvider>
    </TanStackProvider>
  </React.StrictMode>,
)
