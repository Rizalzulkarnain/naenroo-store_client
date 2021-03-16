import * as Constant from '../constants/userConstants';

const usersState = {
  loading: false,
  users: [],
  error: null,
};

const allUsersReducers = (state = usersState, action) => {
  switch (action.type) {
    case Constant.ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Constant.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case Constant.ALL_USERS_ERROR:
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

export default allUsersReducers;
