import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const deleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.DELETE_ORDER_REQUEST,
    });

    const { data: response } = await API.deleteOrder(id);
    dispatch({
      type: Constant.DELETE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.DELETE_ORDER_ERROR,
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
