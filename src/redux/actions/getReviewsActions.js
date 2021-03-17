import * as Constant from '../constants/productConstants';
import * as API from '../../services/Api';

export const getReviewsAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.DISPLAY_REVIEW_REQUEST,
    });

    const { data: response } = await API.displayReviews(id);
    dispatch({
      type: Constant.DISPLAY_REVIEW_SUCCESS,
      payload: response.reviews,
    });
  } catch (error) {
    dispatch({
      type: Constant.DISPLAY_REVIEW_ERROR,
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
