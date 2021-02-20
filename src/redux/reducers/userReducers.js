import * as Constant from '../constants/userConstants';

const userState = {
  loading: false,
  updateProfile: {},
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
