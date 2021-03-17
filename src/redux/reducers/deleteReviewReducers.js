import * as Constant from '../constants/productConstants';

const reviewsState = {
  loading: false,
  isDeleted: null,
  error: null,
};

const deleteReviewsReducers = (state = reviewsState, action) => {
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
        isDeleted: action.payload,
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

export default deleteReviewsReducers;
