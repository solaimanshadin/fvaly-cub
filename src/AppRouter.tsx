import PrivateRoute from 'components/authGaurd/PrivateRoute';
import DefaultLayout from 'components/layout/DefaultLayout';
import Loader from 'components/Loader';
import ConfirmCheckout from 'pages/ConfirmCheckout/ConfirmCheckout';
import OrderSuccess from 'pages/OrderSuccess/OrderSuccess';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Help = React.lazy(() => import('./pages/Help/Help'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));
const Dashboard = React.lazy(() => import('./admin/layout/DefaultLayout'));
const ProductDetails = React.lazy(
  () => import('pages/ProductDetails/ProductDetails')
);

const AppRouter: React.FC = ({ children }) => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/help" component={Help} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/checkout/" component={Checkout} />
            <Route path="/confirm-checkout/" component={ConfirmCheckout} />
            <Route path="/order-confirmed/" component={OrderSuccess} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Suspense>
        </Switch>
      </DefaultLayout>
    </Router>
  );
};

export default AppRouter;
