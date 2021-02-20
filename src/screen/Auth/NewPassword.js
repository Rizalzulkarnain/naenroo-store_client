import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MetaData from '../../components/MetaData';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import {
  newPasswordAction,
  clearErrors,
} from '../../redux/actions/passwordActions.js';

const NewPassword = ({ history, match }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.password);

  useEffect(() => {
    if (error) {
      toastr.error('Forgot Password Error', error);
      dispatch(clearErrors());
    }

    if (success) {
      toastr.success(
        'Change Password Success',
        `change password successsfully`
      );
    }
  }, [dispatch, error, success]);

  const { token } = match.params;
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(newPasswordAction(token, { newPassword, confirmPassword }));
    toastr.success('Change Password Success', `change password successsfully`);
    history.push('/auth/login');
  };

  return (
    <>
      <MetaData title="Change Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit} className="shadow-lg">
              <h1 className="mb-3 text-center">New Password</h1>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

NewPassword.propTypes = {
  history: PropTypes.any,
};

export default NewPassword;
