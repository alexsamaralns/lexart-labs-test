import { api } from './api'

export const getProducts = async (logout, page = 1, searchProduct) => {
  try {
    const response = await api.post('/product/getProducts', { page, searchProduct })
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const getProductById = async (logout, id) => {
  try {
    const response = await api.get(`/product/${id}`)
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const createProduct = async (logout, formData) => {
  try {
    const response = await api.post('/product', formData)
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const updateProduct = async (logout, formData) => {
  try {
    const response = await api.patch(`/product/${formData.id}`, formData)
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const deleteProduct = async (logout, id) => {
  try {
    const response = await api.delete(`/product/${id}`)
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const deleteAllProducts = async (logout) => {
  try {
    const response = await api.delete('/product/deleteAll')
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const getProductsDeleted = async (logout, page = 1, searchProduct) => {
  try {
    const response = await api.post('/product/deleted', { page, searchProduct })
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}

export const addingProducts = async (logout) => {
  try {
    const response = await api.post('/product/addProductsTest')
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}
