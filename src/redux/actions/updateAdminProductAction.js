import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const updateAdminProductAction = (id, product) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.UPDATE_ADMIN_PRODUCT_REQUEST,
    });

    const { data: response } = await API.updateAdminProduct(id, product);
    dispatch({
      type: Constant.UPDATE_ADMIN_PRODUCT_SUCCESS,
      payload: response.data,
    });

    const res = await API.adminProducts();
    dispatch({
      type: Constant.ADMIN_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.UPDATE_ADMIN_PRODUCT_ERROR,
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
