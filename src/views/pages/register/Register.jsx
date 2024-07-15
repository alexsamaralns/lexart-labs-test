import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import { createUser } from 'src/services/api-user'
import './Register.css'

const schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formAlert, setFormAlert] = useState(false)
  const [formAlertMessage, setFormAlertMessage] = useState('')
  const [alertAnimationClass, setAlertAnimationClass] = useState('animate__fadeInTopRight')
  const [buttonDisabled, setButtonDisabled] = useState(false)

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
    setButtonDisabled(true)
    e.preventDefault()
    try {
      schema.parse(formData)
      const result = await createUser(formData)

      if (result.data.status === 'success') {
        setFormAlertMessage('Account created successfully')
        setFormAlert(true)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (result.data.message === 'email must be unique') {
        setFormAlertMessage('E-mail already registered')
        setFormAlert(true)
        setButtonDisabled(false)
      } else {
        setFormAlertMessage('There was a problem creating the account')
        setFormAlert(true)
        setButtonDisabled(false)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
        setButtonDisabled(false)
      }
    }
  }

  return (
    <div className="main-content-register">
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Create your account here</h3>
        <div>
          <label>
            <span>First Name:</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <div className="error-container">
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
        </div>
        <div>
          <label>
            <span>Last Name:</span>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <div className="error-container">{errors.lastName && <span>{errors.lastName}</span>}</div>
        </div>
        <div>
          <label>
            <span>Email:</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <div className="error-container">{errors.email && <span>{errors.email}</span>}</div>
        </div>
        <div>
          <label>
            <span>Password:</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <div className="error-container">{errors.password && <span>{errors.password}</span>}</div>
        </div>
        <div>
          <label>
            <span>Confirm Password:</span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <div className="error-container">
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>
        </div>
        <div>
          <button type="submit" disabled={buttonDisabled}>
            Register
          </button>
          <Link to="/login">
            <div className="register-button">Back</div>
          </Link>
        </div>
      </form>
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
    </div>
  )
}

export default Register
