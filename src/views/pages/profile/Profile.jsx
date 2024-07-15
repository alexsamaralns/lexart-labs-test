import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/contexts/Auth'
import { getProfile } from 'src/services/api-profile'
import { formatDateTime } from 'src/components/utils/formatDate'
import './Profile.css'

const Profile = () => {
  const { logout } = useContext(AuthContext)
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
  })

  useEffect(() => {
    getData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async (page) => {
    const response = await getProfile(logout)
    if (response?.data?.data) {
      setUser({
        id: response?.data?.data.id,
        firstName: response?.data?.data.firstName,
        lastName: response?.data?.data.lastName,
        email: response?.data?.data.email,
        createdAt: formatDateTime(response?.data?.data.createdAt),
      })
    }
  }

  return (
    <div className="main-content-profile">
      <div>
        <h1>Profile</h1>
      </div>
      <div className="profile-container">
        <div>
          <h3>Id: </h3>
          <h4>{user.id}</h4>
        </div>
        <div>
          <h3>First name:</h3>
          <h4>{user.firstName}</h4>
        </div>
        <div>
          <h3>Last name:</h3>
          <h4>{user.lastName}</h4>
        </div>
        <div>
          <h3>E-mail:</h3>
          <h4>{user.email}</h4>
        </div>
        <div>
          <h3>Created at:</h3>
          <h4>{user.createdAt}</h4>
        </div>
      </div>
    </div>
  )
}

export default Profile
