import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MetaData from '../../components/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, isAuthenticated, redirect, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));

    setEmail('');
    setPassword('');
  };

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <MetaData title="Login" />
          <div className="container container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form onSubmit={handleSubmit} className="shadow-lg">
                  <h1 className="mb-3">Login</h1>
                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                      type="password"
                      id="password_field"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Link to="/forgot-password" className="float-right mb-4">
                    Forgot Password?
                  </Link>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading && true}
                  >
                    LOGIN
                  </button>

                  <Link to="/register" className="float-right mt-3">
                    New User?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.object,
};

export default Login;
