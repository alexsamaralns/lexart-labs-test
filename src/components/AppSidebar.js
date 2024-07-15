import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sidebarUnfoldable } from 'src/redux/sidebarUnfoldable/actions'
import { sidebarHideClick } from 'src/redux/sidebarShow/actions'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSpa, cilMugTea } from '@coreui/icons'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { sidebarShowHideClick } = useSelector((rootReducer) => rootReducer.sidebarShowReducer)

  const showSidebar = (mouseOver) => {
    if (mouseOver) {
      setTimeout(() => {
        dispatch(sidebarUnfoldable(true))
      }, 500)
    } else {
      dispatch(sidebarUnfoldable(false))
    }
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={true}
      visible={sidebarShowHideClick}
      onVisibleChange={(visible) => {
        dispatch(sidebarHideClick(visible))
      }}
      onMouseOver={() => showSidebar(true)}
      onMouseOut={() => showSidebar(false)}
      className="theme-sidebar-dark"
    >
      <CSidebarBrand className="d-none d-md-flex sidebar-brand" to="/">
        <CIcon className="sidebar-brand-full" icon={cilSpa} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={cilMugTea} height={35} />
      </CSidebarBrand>
      <CSidebarNav className="hide-scrollbar hide-scrollbar-ie sidebar-nav-options">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className="d-none d-lg-flex" style={{ visibility: 'hidden' }} /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
