import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from './issues/index.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const client = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
