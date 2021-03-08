import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const getAdminProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: Constant.ADMIN_PRODUCTS_REQUEST,
    });

    const { data: response } = await API.adminProducts();
    dispatch({
      type: Constant.ADMIN_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.ADMIN_PRODUCTS_ERROR,
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
