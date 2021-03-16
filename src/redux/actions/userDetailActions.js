import * as Constant from '../constants/userConstants';
import * as API from '../../services/Api';

export const getUserDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.USER_DETAILS_REQUEST,
    });

    const { data: response } = await API.userDetail(id);
    console.log(response);
    dispatch({
      type: Constant.USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.USER_DETAILS_ERROR,
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
