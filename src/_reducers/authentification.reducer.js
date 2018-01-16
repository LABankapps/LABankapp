import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        isLoggedIn: true,
        user: action
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
