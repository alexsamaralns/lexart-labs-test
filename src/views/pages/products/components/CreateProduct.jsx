import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/contexts/Auth'
import { z } from 'zod'
import { createProduct, getProductById, updateProduct } from 'src/services/api-products'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import Loading from 'src/components/loading/Loading'
import './CreateProduct.css'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().min(6, 'Price is required'),
  ),
  operating_system: z.string().min(1, 'Operating system is required'),
})

const CreateProduct = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    model: '',
    price: '',
    operating_system: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [formAlert, setFormAlert] = useState(false)
  const [formAlertMessage, setFormAlertMessage] = useState('')
  const [alertAnimationClass, setAlertAnimationClass] = useState('animate__fadeInTopRight')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    const getIdToEdit = () => {
      const productId = localStorage.getItem('productId')

      if (productId) {
        setIsEditing(true)
        getData(+productId)
        localStorage.removeItem('productId')
      } else {
        setLoading(false)
      }
    }
    getIdToEdit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async (id) => {
    setLoading(true)
    const response = await getProductById(logout, id)
    if (response && response?.data?.data) {
      setFormData({
        id,
        name: response?.data?.data.name,
        brand: response?.data?.data.brand,
        model: response?.data?.data.model,
        price: response?.data?.data.price,
        operating_system: response?.data?.data.operating_system,
      })
    }
    setLoading(false)
  }

  const closeLoginAlert = () => {
    setAlertAnimationClass('animate__fadeOutTopRight')
    setTimeout(() => {
      setFormAlert(false)
      setAlertAnimationClass('animate__fadeInTopRight')
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    setButtonDisabled(true)
    e.preventDefault()
    let result = null
    try {
      schema.parse(formData)

      if (isEditing) {
        result = await updateProduct(logout, formData)
      } else {
        result = await createProduct(logout, formData)
      }

      if (result.data.status === 'success') {
        navigate('/products')
      } else {
        setFormAlertMessage('There was a problem creating the account')
        setFormAlert(true)
        setButtonDisabled(false)
      }
      setLoading(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
        setButtonDisabled(false)
        setLoading(false)
      }
    }
  }

  return (
    <div className="main-content-create-product">
      <div>
        <h1>{isEditing ? 'Edit Product' : 'Create Product'}</h1>
        <Link to="/products">Back</Link>
      </div>
      <div className="create-product-container">
        <form onSubmit={handleSubmit} className="form-container form-container-product">
          <div>
            <label>
              <span>Name:</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <div className="error-container">{errors.name && <span>{errors.name}</span>}</div>
          </div>
          <div>
            <label>
              <span>Brand:</span>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
            </label>
            <div className="error-container">{errors.brand && <span>{errors.brand}</span>}</div>
          </div>
          <div>
            <label>
              <span>Model:</span>
              <input type="text" name="model" value={formData.model} onChange={handleChange} />
            </label>
            <div className="error-container">{errors.model && <span>{errors.model}</span>}</div>
          </div>
          <div>
            <label>
              <span>Price:</span>
              <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <div className="error-container">{errors.price && <span>{errors.price}</span>}</div>
          </div>
          <div>
            <label>
              <span>Operating System:</span>
              <input
                type="text"
                name="operating_system"
                value={formData.operating_system}
                onChange={handleChange}
              />
            </label>
            <div className="error-container">
              {errors.operating_system && <span>{errors.operating_system}</span>}
            </div>
          </div>
          <div>
            <button type="submit" disabled={buttonDisabled}>
              Save
            </button>
          </div>
        </form>
      </div>
      {formAlert && (
        <CToast
          autohide={false}
          visible={true}
          color="danger"
          className={`text-white align-items-center alert-toast animate__animated ${alertAnimationClass}`}
        >
          <div className="d-flex">
            <CToastBody>{formAlertMessage}</CToastBody>
            <CToastClose className="me-2 m-auto" white onClick={closeLoginAlert} />
          </div>
        </CToast>
      )}
      {loading && <Loading />}
    </div>
  )
}

export default CreateProduct
