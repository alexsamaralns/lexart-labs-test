import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'src/contexts/Auth'
import { getDataDashboard } from 'src/services/api-dashboard'
import { addingProducts } from 'src/services/api-products'
import ModalProduct from '../pages/products/components/Modal'
import './Dashboard.css'

const Dashboard = () => {
  const { logout } = useContext(AuthContext)
  const [dashboardInfo, setDashboardInfo] = useState({
    users: 0,
    products: 0,
  })
  const [visible, setVisible] = useState(false)
  const [modalDeleteMessage, setModalDeleteMessage] = useState('')
  const [modalButtons] = useState(1)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await getDataDashboard(logout)

    if (result) {
      setDashboardInfo({
        users: result?.data?.data.users,
        products: result?.data?.data.products,
      })
    }
  }

  const addProductsTest = async () => {
    const result = await addingProducts(logout)
    setVisible(true)

    if (result?.data && result?.data.status === 'success') {
      setModalDeleteMessage('Products added successfully')
      getData()
    } else {
      setModalDeleteMessage('There was a problem adding products')
    }
  }

  return (
    <div className="main-content-dashboard">
      <div>
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-container">
        <div>
          <h3>Number of users: </h3>
          <span>{dashboardInfo.users}</span>
        </div>
        <div>
          <h3>Number of products: </h3>
          <span>{dashboardInfo.products}</span>
        </div>
        <div>
          <button type="button" onClick={addProductsTest}>
            Add 50 products
          </button>
        </div>
      </div>
      <ModalProduct
        visible={visible}
        setVisible={setVisible}
        modalDeleteMessage={modalDeleteMessage}
        modalButtons={modalButtons}
      />
    </div>
  )
}

export default Dashboard
