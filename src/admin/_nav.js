import {
  cilPuzzle,
  cilSpeedometer
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    role: ["admin", "merchant"],

  },
 
  {
    component: CNavGroup,
    name: 'User Management',
    to: '/dashboard/users',
    role: ["admin"],
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User List',
        to: '/dashboard/users',
      },
      // {
      //   component: CNavItem,
      //   name: 'Merchants',
      //   to: '/dashboard/merchant',
      // },
    ],
  },

  // For Merchant
  {
    component: CNavGroup,
    name: 'Product Management',
    to: '/dashboard/products',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    role: ["merchant", "admin"],

    items: [
      {
        component: CNavItem,
        name: 'Product List',
        to: '/dashboard/products',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/dashboard/orders',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    role: ["admin", "merchant"],

}
]

export default _nav
