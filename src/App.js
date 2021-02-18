import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import ProtectedRoute from './Route/ProtectedRoute';

import Home from './screen/Home/Home';
import Login from './screen/Auth/Login';
import Register from './screen/Auth/Register';
import ProductDetail from './screen/ProductDetail/ProductDetail';
import Profile from './screen/Profile/Profile';
import UpdateProfile from './screen/Profile/UpdateProfile';

import { useDispatch } from 'react-redux';
import { loadUserAction } from './redux/actions/authActions';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/register" component={Register} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute
              exact
              path="/profile/update"
              component={UpdateProfile}
            />
          </Layout>
        </Switch>
      </Router>
    </>
  );
};

export default App;
