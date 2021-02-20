import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MetaData from '../../components/MetaData';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatePasswordAction,
  clearErrors,
} from '../../redux/actions/userActions';
import * as Constant from '../../redux/constants/userConstants';

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toastr.error('Update Password Error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, user, error, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePasswordAction({ oldPassword, password }));
    toastr.success('Update Password Success', 'password updated successsfully');
    history.push('/profile');
    dispatch({
      type: Constant.UPDATE_PASSWORD_RESET,
    });
  };

  return (
    <>
      <MetaData title="Change Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit} className="shadow-lg">
              <h2 className="mt-2 mb-5 text-center">Update Password</h2>
              <div className="form-group">
                <label htmlFor="old_password_field">Old Password</label>
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_password_field">New Password</label>
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading ? true : false}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

UpdatePassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UpdatePassword;
