import * as Constant from '../constants/userConstants';

const deleteUserState = {
  loading: false,
  isDeleted: null,
  error: null,
};

const deleteUserReducers = (state = deleteUserState, action) => {
  switch (action.type) {
    case Constant.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case Constant.DELETE_USER_ERROR:
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

export default deleteUserReducers;
