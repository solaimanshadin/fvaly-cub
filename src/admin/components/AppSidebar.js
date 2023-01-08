import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'assets/images/fvaly.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { data } = useSelector((state) => state.auth)
  const filteredNavigation = navigation.filter((nav) => nav.role.includes(data?.role))
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img width={100} style={{filter: 'brightness(0) invert(1)'}} src={logo} alt="" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={filteredNavigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
