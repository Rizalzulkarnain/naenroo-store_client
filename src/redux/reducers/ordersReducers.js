import * as Constant from '../constants/orderConstants';

const orderState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersReducers = (state = orderState, action) => {
  switch (action.type) {
    case Constant.MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case Constant.MY_ORDERS_ERROR:
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

export default ordersReducers;
