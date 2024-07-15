import { api } from './api'

export const createSession = async (email, password) => {
  return api.post('/auth/login/', { email, password })
}

export const createUser = async (formData) => {
  return api.post('/auth/signup/', formData)
}

export const getUsers = async (logout, page = 1) => {
  try {
    const response = await api.post('/users', { page })
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}
