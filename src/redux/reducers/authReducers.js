import * as Constant from '../constants/authConstants';

const authState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: null,
};

const authReducers = (state = authState, action) => {
  switch (action.type) {
    case Constant.LOGIN_REQUEST:
    case Constant.REGISTER_REQUEST:
    case Constant.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case Constant.LOGIN_SUCCESS:
    case Constant.REGISTER_SUCCESS:
    case Constant.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case Constant.LOAD_USER_ERROR:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case Constant.LOGIN_ERROR:
    case Constant.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case Constant.LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case Constant.LOGOUT_ERROR:
      return {
        ...state,
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

export default authReducers;
