import React from 'react'
import { formatDateTime } from 'src/components/utils/formatDate'

const GridUsers = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={`user-${item.id}`}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{formatDateTime(item.createdAt)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GridUsers
