import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const Users = React.lazy(() => import('./views/pages/users/Users'))
const Products = React.lazy(() => import('./views/pages/products/Products'))
const CreateProduct = React.lazy(() => import('./views/pages/products/components/CreateProduct'))
const LogsProducts = React.lazy(() => import('./views/pages/Logs/Logs'))

const routes = [
  { path: '/', name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/users', name: 'Users', element: Users },
  { path: '/products', name: 'Products', element: Products },
  { path: '/register-product', name: 'Create Product', element: CreateProduct },
  { path: '/logs-products', name: 'Logs', element: LogsProducts },
]

export default routes
