import React from 'react'
import { formatDateTime } from 'src/components/utils/formatDate'

const GridProductsDeleted = ({ data }) => {
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
            <th>Deleted At</th>
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
                <td>{formatDateTime(item.deletedAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GridProductsDeleted
