import * as Constant from '../constants/userConstants'

const userState = {
  loading: false,
  isUpdated: false,
  error: null
}

const userReducers = (state = userState, action) => {
  switch (action.type) {
    case Constant.UPDATE_PROFILE_REQUEST:
      return {
        loading: true
      }

    case Constant.UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload
      }

    case Constant.UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false
      }

    case Constant.UPDATE_PROFILE_ERROR:
      return {
        loading: false,
        error: action.payload
      }

    case Constant.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export default userReducers
