import * as Constant from '../constants/userConstants';

const updateUserState = {
  loading: false,
  isUpdated: '',
  error: null,
};

const updateUserReducers = (state = updateUserState, action) => {
  switch (action.type) {
    case Constant.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case Constant.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default updateUserReducers;
