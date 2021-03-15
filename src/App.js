import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import ProtectedRoute from './Route/ProtectedRoute';

import Home from './screen/Home/Home';
import Login from './screen/Auth/Login';
import Register from './screen/Auth/Register';
import ForgotPassword from './screen/Auth/ForgotPassword';
import NewPassword from './screen/Auth/NewPassword';
import ProductDetail from './screen/ProductDetail/ProductDetail';
import Cart from './screen/ProductDetail/Cart';
import Shipping from './screen/Shipping/Shipping';
import ConfirmOrder from './screen/Checkout/ConfirmOrder';
import Payment from './screen/Checkout/Payment';
import OrderSuccess from './screen/Checkout/OrderSuccess';

import ListOrders from './screen/Order/ListOrders';
import OrderDetails from './screen/Order/OrderDetails';

import Profile from './screen/Profile/Profile';
import UpdateProfile from './screen/Profile/UpdateProfile';
import UpdatePassword from './screen/Profile/UpdatePassword';

import Dashboard from './screen/Admin/Dashboard';
import ProductsList from './components/ProductsList';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import ProcessOrder from './components/ProcessOrder';

import AllOrdersList from './components/OrdersList';

import { useDispatch } from 'react-redux';
import { loadUserAction } from './redux/actions/authActions';

//Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import * as API from './services/Api';

import './App.css';

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());

    async function getStripeApiKey() {
      const { data } = await API.stripeApi();
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/shipping/checkout"
              component={Shipping}
            />
            <ProtectedRoute
              exact
              path="/order/checkout/confirm"
              component={ConfirmOrder}
            />

            <ProtectedRoute exact path="/success" component={OrderSuccess} />

            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute exact path="/payment" component={Payment} />
              </Elements>
            )}

            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/new-password/:token" component={NewPassword} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/update" component={UpdatePassword} />
            <ProtectedRoute path="/profile/update" component={UpdateProfile} />
            <ProtectedRoute path="/orders/me" component={ListOrders} />
            <ProtectedRoute path="/order-detail/:id" component={OrderDetails} />
            <ProtectedRoute
              isAdmin={true}
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              isAdmin={true}
              path="/admin/products"
              component={ProductsList}
            />
            <ProtectedRoute
              isAdmin={true}
              path="/admin/new/product"
              component={CreateProduct}
            />
            <ProtectedRoute
              isAdmin={true}
              path="/admin/update/product/:id"
              component={UpdateProduct}
            />
            <ProtectedRoute
              isAdmin={true}
              path="/admin/orders"
              component={AllOrdersList}
            />
            <ProtectedRoute
              isAdmin={true}
              path="/admin/order-detail/:id"
              component={ProcessOrder}
            />
          </Layout>
        </Switch>
      </Router>
    </>
  );
};

export default App;
