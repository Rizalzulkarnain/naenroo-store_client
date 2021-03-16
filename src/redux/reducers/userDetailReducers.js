import * as Constant from '../constants/userConstants';

const userDetailState = {
  loading: false,
  singleUser: {},
  error: null,
};

const userDetailReducers = (state = userDetailState, action) => {
  switch (action.type) {
    case Constant.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        singleUser: action.payload,
      };

    case Constant.USER_DETAILS_ERROR:
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

export default userDetailReducers;
