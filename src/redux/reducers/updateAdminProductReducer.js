import * as Constant from '../constants/productConstants';

const adminProductState = {
  loading: false,
  isUpdated: {},
  error: null,
};

const updateAdminProductReducers = (state = adminProductState, action) => {
  switch (action.type) {
    case Constant.DELETE_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.DELETE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case Constant.DELETE_ADMIN_PRODUCT_ERROR:
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

export default updateAdminProductReducers;
