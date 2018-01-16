import { recordConstants } from '../_constants';

export function records(state = {}, action) {
  switch (action.type) {
    case recordConstants.GETBYUSERID_REQUEST:
      return {
        loading: true
      };
    case recordConstants.GETBYUSERID_SUCCESS:
      return {
        items: action.records
      };
    case recordConstants.GETBYUSERID_FAILURE:
      return {
        error: action.error
      };
    case recordConstants.UPDATE_REQUEST:
      // add 'updating:true' property to record being updated
      return {
        loading: true,
        ...state,
        items: state.items.map(record => (
          record._id === action.record._id ? { ...action.record, updating: true } : record
        )),
        temp: state.items.map(record => (
          record._id === action.record._id ? { ...record} : record
        ))
      };
    case recordConstants.UPDATE_SUCCESS:
      return {
        items: state.items.map(record => (
          record._id === action.record._id ? action.record : record
        ))
      };
    case recordConstants.UPDATE_FAILURE:
      //remove updating element
      return {
        items: state.items.map((record) => (
          record.updating ? state.temp[0] : record
        )),
        error: action.error
      };
    default:
      return state
  }
}
