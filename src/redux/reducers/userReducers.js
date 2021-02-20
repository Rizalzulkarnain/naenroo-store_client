import { actions } from 'react-redux-toastr';
import * as Constant from '../constants/userConstants';

const userState = {
  loading: false,
  updateProfile: {},
  message: '',
  error: null,
};

const userReducers = (state = userState, action) => {
  switch (action.type) {
    case Constant.UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        updateProfile: {},
      };

    case Constant.UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        updateProfile: action.payload,
      };

    case Constant.UPDATE_PROFILE_RESET:
    case Constant.UPDATE_PASSWORD_RESET:
      return {
        loading: false,
        updateProfile: {},
      };

    case Constant.UPDATE_PROFILE_ERROR:
      return {
        loading: false,
        error: action.payload,
        updateProfile: {},
      };

    case Constant.UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
        updateProfile: {},
      };

    case Constant.UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        updateProfile: actions.payload,
      };

    case Constant.UPDATE_PASSWORD_ERROR:
      return {
        loading: false,
        error: actions.payload,
        updateProfile: {},
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
