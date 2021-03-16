import * as Constant from '../constants/orderConstants';

const updateOrderState = {
  loading: false,
  isDeleted: null,
  error: null,
};

const deleteOrderReducers = (state = updateOrderState, action) => {
  switch (action.type) {
    case Constant.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case Constant.DELETE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default deleteOrderReducers;
