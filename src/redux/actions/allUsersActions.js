import * as Constant from '../constants/userConstants';
import * as API from '../../services/Api';

export const getAllUsersActions = () => async (dispatch) => {
  try {
    dispatch({
      type: Constant.ALL_USERS_REQUEST,
    });

    const { data: response } = await API.allUsers();
    dispatch({
      type: Constant.ALL_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.ALL_USERS_ERROR,
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
