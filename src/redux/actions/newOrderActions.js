import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Constant.CREATE_ORDER_REQUEST,
    });

    const { data: response } = await API.createOrder(order);
    dispatch({
      type: Constant.CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.CREATE_ORDER_ERROR,
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
