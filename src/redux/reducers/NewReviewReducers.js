import * as Constant from '../constants/productConstants';

const productsState = {
  loading: false,
  success: {},
  error: null,
};

const newReviewReducers = (state = productsState, action) => {
  switch (action.type) {
    case Constant.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case Constant.NEW_REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constant.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export default newReviewReducers;
