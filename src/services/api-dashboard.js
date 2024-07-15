import { api } from './api'

export const getDataDashboard = async (logout) => {
  try {
    const response = await api.get('/dashboard')
    return response
  } catch (error) {
    console.log('error: ', error)
    if (error?.response?.data?.message === 'Token Expired') logout()
  }
}
