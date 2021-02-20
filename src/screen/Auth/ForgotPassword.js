import { useState, useEffect } from 'react';
import MetaData from '../../components/MetaData';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordAction,
  clearErrors,
} from '../../redux/actions/passwordActions.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.password);

  useEffect(() => {
    if (error) {
      toastr.error('Forgot Password Error', error);
      dispatch(clearErrors());
    }

    if (message) {
      toastr.success(
        'Sent to Email Success',
        `Email sent to ${email} successsfully`
      );
    }
  }, [dispatch, error, email, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordAction({ email }));
    toastr.success(
      'Sent to Email Success',
      `Email sent to ${email} successsfully`
    );
  };

  return (
    <>
      <MetaData title="Forgot Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit} className="shadow-lg">
              <h1 className="mb-3 text-center">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
