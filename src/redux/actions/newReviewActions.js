import * as API from '../../services/Api';
import * as Constant from '../constants/productConstants';

export const newReviewActions = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.NEW_REVIEW_REQUEST,
    });

    const { data: response } = await API.newReview(reviewData);
    dispatch({
      type: Constant.NEW_REVIEW_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: Constant.NEW_REVIEW_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: Constant.CLEAR_ERRORS,
  });
};
