import * as Constant from '../constants/orderConstants';

const updateOrderState = {
  loading: false,
  isUpdated: '',
  error: null,
};

const updateOrderReducers = (state = updateOrderState, action) => {
  switch (action.type) {
    case Constant.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case Constant.UPDATE_ORDER_ERROR:
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

export default updateOrderReducers;
