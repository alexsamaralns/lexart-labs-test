import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilTask, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '../../assets/images/avatars/avatar.png'
import './AppHeaderDropdown.css'

const AppHeaderDropdown = () => {
  const { logout } = useContext(AuthContext)
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer)

  const handleLogout = () => {
    logout()
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <div className="dropdown-header">
          <span>{currentUser.name}</span>
        </div>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <div className="dropdown-header">
          <Link to="/profile">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </Link>
        </div>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
