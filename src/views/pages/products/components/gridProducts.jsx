import React from 'react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { formatDateTime } from 'src/components/utils/formatDate'

const GridProducts = ({
  data,
  setVisible,
  setSelectedProduct,
  setModalDeleteMessage,
  setModalButtons,
}) => {
  const navigate = useNavigate()

  const editProduct = (id) => {
    localStorage.setItem('productId', id)
    navigate('/register-product')
  }

  const deletetProduct = (id) => {
    setModalDeleteMessage('Are you sure you want to delete this product?')
    setModalButtons(2)
    setSelectedProduct(id)
    setVisible(true)
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>S.O.</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body-products">
          {data.map((item) => {
            return (
              <tr key={`user-${item.id}`}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{`$${item.price}`}</td>
                <td>{item.operating_system}</td>
                <td>{formatDateTime(item.createdAt)}</td>
                <td>
                  <div className="actions-table">
                    <button type="button" onClick={() => editProduct(item.id)}>
                      <CIcon icon={cilPencil} />
                    </button>
                    <button type="button" onClick={() => deletetProduct(item.id)}>
                      <CIcon icon={cilTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GridProducts
