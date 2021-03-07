import * as Constant from '../constants/orderConstants';

const orderState = {
  loading: false,
  order: {},
  error: null,
};

const orderDetailsReducers = (state = orderState, action) => {
  switch (action.type) {
    case Constant.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case Constant.ORDER_DETAILS_ERROR:
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

export default orderDetailsReducers;
