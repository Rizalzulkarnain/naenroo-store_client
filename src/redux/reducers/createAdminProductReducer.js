import * as Constant from '../constants/productConstants';

const adminProductsState = {
  loading: false,
  product: {},
  error: null,
};

const adminProductsReducers = (state = adminProductsState, action) => {
  switch (action.type) {
    case Constant.CREATE_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.CREATE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case Constant.CREATE_ADMIN_PRODUCT_ERROR:
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
