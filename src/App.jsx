import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import Loading from './components/loading/Loading'
import './App.css'

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={Loading}>
        <AppRoutes />
      </Suspense>
    </HashRouter>
  )
}

export default App
