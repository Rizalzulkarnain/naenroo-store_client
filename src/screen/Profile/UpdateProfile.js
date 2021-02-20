import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MetaData from '../../components/MetaData';
import DefaultAvatar from '../../images/default_avatar.jpg';
import { toastr } from 'react-redux-toastr';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfileAction,
  clearErrors,
} from '../../redux/actions/userActions';
import { loadUserAction } from '../../redux/actions/authActions';
import * as Constant from '../../redux/constants/userConstants';

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(DefaultAvatar);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toastr.error('Update Profile Error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, user, error, history, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateProfileAction(formData));
    toastr.success('Update Success', 'user updated successsfully');
    dispatch(loadUserAction());
    history.push('/profile');
    dispatch({
      type: Constant.UPDATE_PROFILE_RESET,
    });
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title="Update Profile" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={handleSubmit}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="email_field">Name</label>
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
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="../../images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading && true}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UpdateProfile;
