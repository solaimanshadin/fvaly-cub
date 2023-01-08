import React from 'react'
import store from 'redux/store'
import AddUser from './views/addUser/AddUser'
import OrderList from './views/OrderList/OrderList'
import OrderDetails from './views/OrderList/ViewDetails'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MerchantDashboard = React.lazy(() => import('./views/dashboard/MerchantDashboard'))
const UserList = React.lazy(() => import('./views/userList/UserList'))
const ProductList = React.lazy(() => import('./views/productList/ProductList'))
const AddProduct = React.lazy(() => import('./views/addProduct/AddProduct'))

const { auth: { data } } = store.getState();

const selectDashboard = () => {
    switch(data?.role) {
      case 'merchant': 
        return MerchantDashboard
      case "admin": 
        return Dashboard
      default: 
        return null 
    }
}


const routes = [
  { exact: true, path: '/dashboard', name: 'Dashboard', component: selectDashboard(), role: ["admin", "merchant"] },
  { exact: true, path: '/dashboard/users', name: 'User List', component: UserList,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/products', name: 'Product List', component: ProductList,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/add-product', name: 'Add Product', component: AddProduct,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/add-product/:id', name: 'Add Product', component: AddProduct,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/add-user/', name: 'Add User', component: AddUser,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/add-user/:id', name: 'Add User', component: AddUser,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/orders', name: 'Orders', component: OrderList,
  role: ["admin"]  },
  { exact: true, path: '/dashboard/orders/:id', name: 'Orders', component: OrderDetails,
  role: ["admin"]  },
]

export default routes
