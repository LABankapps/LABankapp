import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        items: action.user
      };
    case userConstants.GETBYID_FAILURE:
      return {
        error: action.error
      };
    case userConstants.UPDATE_REQUEST:
    // add 'updating:true' property to user being updated
    return {
      loading: true,
      ...state,
      items: state.items.map(user => (
        user._id === action.user._id ? { ...action.user, updating: true } : user
      )),
      temp: state.items.map(user => (
        user._id === action.user._id ? { ...user} : user
      ))
    };
    case userConstants.UPDATE_SUCCESS:
      return {
        items: state.items.map(user => (
          user._id === action.user._id ? action.user : user
        ))
      };
    case userConstants.UPDATE_FAILURE:
      //remove updating element
      return {
        items: state.items.map((user) => (
          user.updating ? state.temp[0] : user
        )),
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        ...state,
        items: state.items.map(user =>
          user._id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user._id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user._id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}
