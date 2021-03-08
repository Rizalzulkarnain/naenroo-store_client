import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const createAdminProductAction = (product) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.CREATE_ADMIN_PRODUCT_REQUEST,
    });

    const { data: response } = await API.createAdminProduct(product);
    console.log(response);
    dispatch({
      type: Constant.CREATE_ADMIN_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.CREATE_ADMIN_PRODUCT_ERROR,
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
