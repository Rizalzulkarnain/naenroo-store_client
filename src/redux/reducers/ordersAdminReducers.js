import * as Constant from '../constants/orderConstants';

const orderState = {
  loading: false,
  orders: [],
  totalAmount: null,
  error: null,
};

const ordersAdminReducers = (state = orderState, action) => {
  switch (action.type) {
    case Constant.ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data,
        totalAmount: action.payload.totalAmount,
      };

    case Constant.ALL_ORDERS_ERROR:
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

export default ordersAdminReducers;
