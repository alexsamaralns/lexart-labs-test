import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/Auth'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginAlert, setLoginAlert] = useState(false)
  const [loginAlertMessage, setLoginAlertMessage] = useState('')
  const [alertAnimationClass, setAlertAnimationClass] = useState('animate__fadeInTopRight')
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const responseLogin = await login(email, password)

    if (responseLogin === 'Access authorized!') {
      navigate('/dashboard')
    } else {
      setLoginAlertMessage(responseLogin)
      setLoginAlert(true)
    }
  }

  const closeLoginAlert = () => {
    setAlertAnimationClass('animate__fadeOutTopRight')
    setTimeout(() => {
      setLoginAlert(false)
      setAlertAnimationClass('animate__fadeInTopRight')
    }, 1000)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center bg-login">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4 login-card">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="login-title">Welcome!</h1>
                    <p className="login-info">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="icon-input-login">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        className="input-login"
                        placeholder="Login"
                        autoComplete="login"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText className="icon-input-login">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        className="input-login"
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid gap-2">
                      <button className="btn-login login-button" type="submit">
                        LOGIN
                      </button>
                    </div>
                    <Link to="/register">
                      <div className="register-button">Register Now!</div>
                    </Link>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {loginAlert && (
        <CToast
          autohide={false}
          visible={true}
          color="danger"
          className={`text-white align-items-center alert-toast animate__animated ${alertAnimationClass}`}
        >
          <div className="d-flex">
            <CToastBody>{loginAlertMessage}</CToastBody>
            <CToastClose className="me-2 m-auto" white onClick={closeLoginAlert} />
          </div>
        </CToast>
      )}
    </div>
  )
}

export default Login
