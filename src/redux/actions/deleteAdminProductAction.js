import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const deleteAdminProductAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.DELETE_ADMIN_PRODUCT_REQUEST,
    });

    const { data: response } = await API.deleteAdminProduct(id);
    dispatch({
      type: Constant.DELETE_ADMIN_PRODUCT_SUCCESS,
      payload: response,
    });

    const res = await API.adminProducts();
    dispatch({
      type: Constant.ADMIN_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.DELETE_ADMIN_PRODUCT_ERROR,
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
