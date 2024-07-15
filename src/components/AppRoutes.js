import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, AuthContext } from '../contexts/Auth'
import DefaultLayout from '../layout/DefaultLayout'
import Login from '../views/pages/login/Login'
import Register from '../views/pages/register/Register'
import Page404 from '../views/pages/page404/Page404'
import Loading from './loading/Loading'

const AppRoutes = () => {
  /* eslint-disable react/prop-types */
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <Loading />
    }

    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route
          exact
          path="/404"
          name="Page 404"
          element={
            <Private>
              <Page404 />
            </Private>
          }
        />
        <Route
          path="*"
          name="Home"
          element={
            <Private>
              <DefaultLayout />
            </Private>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes
