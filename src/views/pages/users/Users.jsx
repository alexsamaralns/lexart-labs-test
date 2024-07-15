import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/contexts/Auth'
import { getUsers } from 'src/services/api-user'
import GridUsers from './components/gridUsers'
import Pagination from 'src/components/utils/Pagination'
import Loading from 'src/components/loading/Loading'
import './Users.css'

const Users = () => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [showPagination, setShowPagination] = useState(false)
  const [paginationInfo, setPaginationInfo] = useState({
    itemsPerPage: 0,
    totalItems: 0,
    paginateBack: 0,
    paginateForward: 0,
    totalPages: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async (page) => {
    setLoading(true)
    const response = await getUsers(logout, page)
    if (response?.data?.pagination?.totalPages > 1) {
      setShowPagination(true)
      setPaginationInfo({
        itemsPerPage: response?.data?.pagination?.itemsPerPage,
        totalItems: response?.data?.pagination?.totalRegisters,
        prevPage: response?.data?.pagination?.prevPage,
        nextPage: response?.data?.pagination?.nextPage,
        totalPages: response?.data?.pagination?.totalPages,
      })
    }
    setUsers(response?.data.data)
    setLoading(false)
  }

  const paginate = (page) => {
    setCurrentPage(page)
    getData(page)
  }

  return (
    <div className="main-content-users">
      <div>
        <h1>Users</h1>
      </div>
      <div className="users-container">
        {users.length === 0 && (
          <div>
            <h2>No users found!</h2>
          </div>
        )}
        {users.length > 0 && (
          <div className="grid-container">
            <GridUsers data={users} />
          </div>
        )}
      </div>
      {showPagination && (
        <div className="pagination">
          <Pagination
            itemsPerPage={paginationInfo.itemsPerPage}
            totalItems={paginationInfo.totalItems}
            totalPages={paginationInfo.totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
      {loading && <Loading />}
    </div>
  )
}

export default Users
