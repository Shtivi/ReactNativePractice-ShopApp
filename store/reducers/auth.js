import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, AUTO_LOGIN_ATTEMPT } from "../actions/auth"

const initialState = {
  token: null,
  userId: null,
  hasAttemptedAutoLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTO_LOGIN_ATTEMPT: 
      return {
        ...state,
        hasAttemptedAutoLogin: true
      }
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      }
    case LOGOUT:
      return {
        ...initialState,
        hasAttemptedAutoLogin: false
      }
    default:
      return state;
  }
}