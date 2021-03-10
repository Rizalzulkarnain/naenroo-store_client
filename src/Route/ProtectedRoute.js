import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserAction } from '../redux/actions/authActions';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === false && user.role !== 'admin') {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
};

export default ProtectedRoute;
