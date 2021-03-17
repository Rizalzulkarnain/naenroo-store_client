import * as Constant from '../constants/productConstants';

const reviewsState = {
  loading: false,
  reviews: [],
  error: null,
};

const displayReviewsReducers = (state = reviewsState, action) => {
  switch (action.type) {
    case Constant.DISPLAY_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.DISPLAY_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };

    case Constant.DISPLAY_REVIEW_ERROR:
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

export default displayReviewsReducers;
