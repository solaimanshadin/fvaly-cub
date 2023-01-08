import {
  cilLockLocked
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar, CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
// import { useHistory } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/user.png'


const AppHeaderDropdown = () => {
  const handleLogout = () => {
    localStorage.clear();
    location.href = '/'
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
       
       
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
