import * as Constant from '../constants/userConstants';
import * as API from '../../services/Api';

export const updateUserAction = (id, user) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.UPDATE_USER_REQUEST,
    });

    const { data: response } = await API.updateUser(id, user);
    dispatch({
      type: Constant.UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.UPDATE_USER_ERROR,
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
