import * as Constant from '../constants/productConstants';
import * as API from '../../services/Api';

export const deleteReviewAction = (id, productId) => async (dispatch) => {
  try {
    dispatch({
      type: Constant.DISPLAY_REVIEW_REQUEST,
    });

    const { data: response } = await API.deleteReview(id, productId);
    dispatch({
      type: Constant.DISPLAY_REVIEW_SUCCESS,
      payload: response.data,
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
