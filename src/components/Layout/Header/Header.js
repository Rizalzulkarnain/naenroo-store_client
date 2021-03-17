import { Link, Route } from 'react-router-dom';
import Search from '../../Search';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../redux/actions/authActions';

import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logoutAction());
    toastr.success('LogOut Success', 'User Successfully Logout...!');
  };

  const cartTotal = () => {
    return JSON.parse(localStorage.getItem('cartItems')) === null ? (
      <>0</>
    ) : (
      cartItems.length
    );
  };

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <Link to="/">
            <div className="navbar-brand">
              <div className="title-brand">Naenroo_Store</div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartTotal()}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dopdown d-inline">
              <Link
                to="!#"
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === 'admin' && (
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}

                <Link to="/orders/me" className="dropdown-item">
                  Orders
                </Link>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  to="/"
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-2" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
