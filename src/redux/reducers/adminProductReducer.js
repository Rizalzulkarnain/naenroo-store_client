import * as Constant from '../constants/productConstants';

const adminProductsState = {
  loading: false,
  products: [],
  error: null,
};

const adminProductsReducers = (state = adminProductsState, action) => {
  switch (action.type) {
    case Constant.ADMIN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case Constant.ADMIN_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default adminProductsReducers;
