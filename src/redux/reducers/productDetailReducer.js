import * as Constant from '../constants/productConstants';

const productDetailState = {
  loading: false,
  product: {},
  error: null,
};

const productDetailReducer = (state = productDetailState, action) => {
  switch (action.type) {
    case Constant.PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case Constant.PRODUCT_DETAIL_ERROR:
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

export default productDetailReducer;
