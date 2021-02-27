import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const getAllProducts = (
  keyword = '',
  currentPage = 1,
  price,
  category,
  rating = 0
) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.ALL_PRODUCTS_REQUEST,
    });

    let link = API.fetchProducts(keyword, currentPage, price, rating);

    if (category) {
      link = API.fetchProductsCategory(keyword, currentPage, price, category);
    }

    const { data: response } = await link;
    dispatch({
      type: Constant.ALL_PRODUCTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: Constant.ALL_PRODUCTS_ERROR,
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
