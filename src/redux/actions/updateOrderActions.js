import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const updateOrderAction = (id, orderData) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.UPDATE_ORDER_REQUEST,
    });

    const { data: response } = await API.updateOrder(id, orderData);
    dispatch({
      type: Constant.UPDATE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.UPDATE_ORDER_ERROR,
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
