import * as Constant from '../constants/userConstants';
import * as API from '../../services/Api';

export const updateProfileAction = (user) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.UPDATE_PROFILE_REQUEST,
    });

    const { data: response } = await API.updateProfile(user);
    dispatch({
      type: Constant.UPDATE_PROFILE_SUCCESS,
      payload: {
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
        createdAt: response.data.createdAt,
      },
    });
  } catch (error) {
    dispatch({
      type: Constant.UPDATE_PROFILE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePasswordAction = (password) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.UPDATE_PASSWORD_REQUEST,
    });

    const { data: response } = await API.updatePassword(password);
    dispatch({
      type: Constant.UPDATE_PASSWORD_SUCCESS,
      payload: response.data.password,
    });
  } catch (error) {
    dispatch({
      type: Constant.UPDATE_PASSWORD_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: Constant.CLEAR_ERRORS,
  });
};
