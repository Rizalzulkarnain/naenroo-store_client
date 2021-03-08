import * as API from '../../services/Api';
import * as Constant from '../constants/authConstants';

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.LOGIN_REQUEST,
    });

    const { data: response } = await API.loginUser(email, password);
    dispatch({
      type: Constant.LOGIN_SUCCESS,
      payload: {
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
        role: response.data.role,
        createdAt: response.data.createdAt,
        token: response.token,
      },
    });
  } catch (error) {
    dispatch({
      type: Constant.LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerAction = (user) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.REGISTER_REQUEST,
    });

    const { data: response } = await API.registerUser(user);
    dispatch({
      type: Constant.REGISTER_SUCCESS,
      payload: {
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
        createdAt: response.data.createdAt,
        token: response.token,
      },
    });
  } catch (error) {
    dispatch({
      type: Constant.REGISTER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: Constant.LOAD_USER_REQUEST,
    });

    const { data: response } = await API.loadUser();
    dispatch({
      type: Constant.LOAD_USER_SUCCESS,
      payload: {
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar,
        createdAt: response.data.createdAt,
        role: response.data.role,
        token: response.token,
      },
    });
  } catch (error) {
    dispatch({
      type: Constant.LOAD_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const { data: response } = await API.logoutUser();
    dispatch({
      type: Constant.LOGOUT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: Constant.LOGOUT_ERROR,
      payload: 'LogOut Error',
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: Constant.CLEAR_ERRORS,
  });
};
