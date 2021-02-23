import * as Constant from '../constants/productConstants';

const productsState = {
  loading: false,
  products: [],
  error: null,
};

const productsReducers = (state = productsState, action) => {
  switch (action.type) {
    case Constant.ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        products: action.payload.products,
      };

    case Constant.ALL_PRODUCTS_ERROR:
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

export default productsReducers;
