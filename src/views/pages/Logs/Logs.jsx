import React, { useEffect, useState, useContext, useMemo } from 'react'
import { AuthContext } from 'src/contexts/Auth'
import { getProductsDeleted } from 'src/services/api-products'
import GridProductsDeleted from './components/gridProductsDeleted'
import Pagination from 'src/components/utils/Pagination'
import Loading from 'src/components/loading/Loading'
import './Logs.css'

const LogsProducts = () => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [showPagination, setShowPagination] = useState(false)
  const [paginationInfo, setPaginationInfo] = useState({
    itemsPerPage: 0,
    totalItems: 0,
    paginateBack: 0,
    paginateForward: 0,
    totalPages: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getData(1, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async (page, searchProduct) => {
    setLoading(true)
    const response = await getProductsDeleted(logout, page, search)
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
    setProducts(response?.data.data)
    setLoading(false)
  }

  const paginate = (page) => {
    setCurrentPage(page)
    getData(page, search)
  }

  const searchProduct = useMemo(() => {
    paginate(1)
  }, [search])

  return (
    <div className="main-content-logs">
      <div>
        <h1>Products Deleted</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search"
        />
      </div>
      <div className="logs-container">
        {products.length === 0 && (
          <div>
            <h2>No products deleted found!</h2>
          </div>
        )}
        {products.length > 0 && (
          <div className="grid-container">
            <GridProductsDeleted data={products} />
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

export default LogsProducts
