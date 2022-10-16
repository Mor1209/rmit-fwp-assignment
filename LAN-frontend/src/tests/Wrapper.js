import { createMemoryHistory } from 'history'
import React from 'react'
// import { Routes, Route,  } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
const queryClient = new QueryClient()

export default function Wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  )
}
