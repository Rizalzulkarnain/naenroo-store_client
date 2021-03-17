import * as Constant from '../constants/userConstants';
import * as API from '../../services/Api';

export const deleteUserAdminAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.DELETE_USER_REQUEST,
    });

    const { data: response } = await API.deleteUser(id);
    dispatch({
      type: Constant.DELETE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.DELETE_USER_ERROR,
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
