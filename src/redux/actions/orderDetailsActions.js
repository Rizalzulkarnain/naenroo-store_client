import * as Constant from '../constants/orderConstants';
import * as API from '../../services/Api';

export const getOrderDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.ORDER_DETAILS_REQUEST,
    });

    const { data: response } = await API.orderDetails(id);
    dispatch({
      type: Constant.ORDER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.ORDER_DETAILS_ERROR,
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
