import * as Constant from '../constants/passwordContants';
import * as API from '../../services/Api';

export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.FORGOT_PASSWORD_REQUEST,
    });

    const { data: response } = await API.forgotPassword(email);
    dispatch({
      type: Constant.FORGOT_PASSWORD_SUCCESS,
      payload: response.message,
    });
  } catch (error) {
    dispatch({
      type: Constant.FORGOT_PASSWORD_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const newPasswordAction = (token, passwords) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.NEW_PASSWORD_REQUEST,
    });

    const { data: response } = await API.forgotPassword(token, passwords);
    dispatch({
      type: Constant.NEW_PASSWORD_SUCCESS,
      payload: response.success,
    });
  } catch (error) {
    dispatch({
      type: Constant.NEW_PASSWORD_ERROR,
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
