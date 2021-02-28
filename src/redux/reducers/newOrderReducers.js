import * as Constant from '../constants/orderConstants';

const orderState = {
  loading: false,
  order: {},
  error: null,
};

const newOrderReducers = (state = orderState, action) => {
  switch (action.type) {
    case Constant.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case Constant.CREATE_ORDER_ERROR:
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

export default newOrderReducers;
