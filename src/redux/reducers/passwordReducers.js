import * as Constant from '../constants/passwordContants';

const userState = {
  loading: false,
  message: '',
  success: null,
  error: '',
};

const userReducers = (state = userState, action) => {
  switch (action.type) {
    case Constant.FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case Constant.FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case Constant.FORGOT_PASSWORD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    case Constant.NEW_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case Constant.NEW_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case Constant.NEW_PASSWORD_ERROR:
      return {
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

export default userReducers;
