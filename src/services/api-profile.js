import { api } from './api'

export const getProfile = async (logout) => {
  try {
    const response = await api.get('/profile')
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}
