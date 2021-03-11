import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const getAllOrdersAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: Constant.ALL_ORDERS_REQUEST,
    });

    const { data: response } = await API.allOrders();
    dispatch({
      type: Constant.ALL_ORDERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: Constant.ALL_ORDERS_ERROR,
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
