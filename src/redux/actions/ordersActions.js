import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const myOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: Constant.MY_ORDERS_REQUEST,
    });

    const { data: response } = await API.myOrders();
    dispatch({
      type: Constant.MY_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.MY_ORDERS_ERROR,
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
