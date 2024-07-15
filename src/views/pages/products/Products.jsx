import React, { useEffect, useState, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'src/contexts/Auth'
import { getProducts, deleteProduct, deleteAllProducts } from 'src/services/api-products'
import GridProducts from './components/gridProducts'
import Pagination from 'src/components/utils/Pagination'
import ModalProduct from './components/Modal'
import Loading from 'src/components/loading/Loading'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import ModalProgress from './components/ModalProgress'
import './Products.css'

const Products = () => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [deletingProducts, setDeletingProducts] = useState(false)
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
  const [visible, setVisible] = useState(false)
  const [modalDeleteMessage, setModalDeleteMessage] = useState('')
  const [modalButtons, setModalButtons] = useState(2)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    getData(1, search)
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET)

    socket.onopen = () => {
      console.log('WebSocket connection established')
    }

    socket.onmessage = (event) => {
      setProgress(+event.data)
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      socket.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('progress: ', progress)
    if (deletingProducts && progress === 100) setDeletingProducts(false)
  }, [progress])

  const getData = async (page, searchProduct) => {
    setLoading(true)
    const response = await getProducts(logout, page, searchProduct)
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

  const deleteProducts = async () => {
    setLoading(true)
    setVisible(false)
    let response = null

    if (selectedProduct === null) {
      setLoading(false)
      setDeletingProducts(true)
      response = await deleteAllProducts(logout)
      setShowPagination(false)
    } else {
      response = await deleteProduct(logout, selectedProduct)
    }

    if (response?.data?.status === 'success') {
      paginate(1)
      setSelectedProduct(null)
    } else {
      setModalDeleteMessage('There was a problem deleting the product')
      setModalButtons(1)
      setSelectedProduct(null)
      setVisible(true)
    }
    setLoading(false)
  }

  const deleteAll = () => {
    setModalDeleteMessage('This action will delete all products.')
    setModalButtons(2)
    setVisible(true)
  }

  const searchProduct = useMemo(() => {
    paginate(1)
  }, [search])

  return (
    <div className="main-content-products">
      <div>
        <h1>Products</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search"
        />
        <div>
          <Link to="/register-product">
            <div className="register-product-button">
              <CIcon icon={cilPlus} />
              Add
            </div>
          </Link>
          {products.length > 1 && (
            <button type="button" className="delete-all-product-button" onClick={deleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
      <div className="products-container">
        {products.length === 0 && (
          <div>
            <h2>No products found!</h2>
          </div>
        )}
        {products.length > 0 && (
          <div className="grid-container">
            <GridProducts
              data={products}
              setVisible={setVisible}
              setModalDeleteMessage={setModalDeleteMessage}
              setSelectedProduct={setSelectedProduct}
              setModalButtons={setModalButtons}
            />
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
      <ModalProduct
        visible={visible}
        setVisible={setVisible}
        deleteProducts={deleteProducts}
        modalDeleteMessage={modalDeleteMessage}
        modalButtons={modalButtons}
      />
      {loading && <Loading />}
      {deletingProducts && <ModalProgress progress={progress} />}
    </div>
  )
}

export default Products
