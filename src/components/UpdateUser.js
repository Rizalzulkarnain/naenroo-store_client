import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MetaData from './MetaData';
import Sidebar from '../screen/Admin/Sidebar';

import { toastr } from 'react-redux-toastr';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetailsAction } from '../redux/actions/userDetailActions';
import {
  updateUserAction,
  clearErrors,
} from '../redux/actions/updateUserActions';

const UpdateUser = ({ match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.userDetails);
  const { error, isUpdated } = useSelector((state) => state.updateUser);

  const { id } = match.params;
  useEffect(() => {
    if (singleUser && singleUser._id !== id) {
      setName(singleUser.name);
      setEmail(singleUser.email);
      setRole(singleUser.role);
    } else {
      dispatch(getUserDetailsAction(id));
    }

    if (error) {
      toastr.error('Error Update User');
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(getUserDetailsAction(id));
    }
  }, [dispatch, singleUser, isUpdated, error, id]);

  const updateUserHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);

    dispatch(updateUserAction(singleUser._id, formData));
    if (isUpdated) {
      toastr.success('User Updated', `${name}, ${email}, ${role}`);
    }
  };

  console.log(singleUser);
  return (
    <>
      <MetaData title="Update User" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form onSubmit={updateUserHandler} className="shadow-lg">
                <h1 className="mt-2 mb-5 text-center">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

export default UpdateUser;
