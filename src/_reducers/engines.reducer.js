import { engineConstants } from '../_constants';

export function engines(state = {}, action) {
  switch (action.type) {
    case engineConstants.CREATE_REQUEST:
      return {
        loading: true,
        items: [...state.items, { _id: 'temp', ...action.engine, creating: true }]
      };
    case engineConstants.CREATE_SUCCESS:
      return {
        items: state.items.map(engine =>
          engine.creating
            ? action.engine
            : engine
        )
      };
    case engineConstants.CREATE_FAILURE:
      return {
        items: state.items.filter(engine => engine.creating !== true)
      };
    case engineConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case engineConstants.GETALL_SUCCESS:
      return {
        items: action.engines
      };
    case engineConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case engineConstants.GET_IMAGE_BY_ID_REQUEST:
      return {
        items: state.items.map(engine =>
          engine._id === action.engine._id
            ? { ...engine, loading: true }
            : engine
        )
      };
    case engineConstants.GET_IMAGE_BY_ID_SUCCESS:
      return {
        items: state.items.map(engine =>
          engine._id === action.engine._id
            ? { ...action.engine }
            : engine
        )
      };
    case engineConstants.GET_IMAGE_BY_ID_FAILURE:
      return {
        items: state.items.map(engine =>
          engine._id === action.engine._id
            ? { ...engine }
            : engine
        ),
        error: action.error
      };
    case engineConstants.UPDATE_IMAGE_BY_ID_REQUEST:
      return {
        items: state.items.map(engine =>
          engine._id === action.engine._id
            ? { ...engine, loading: true }
            : engine
        )
      };
    case engineConstants.UPDATE_IMAGE_BY_ID_SUCCESS:
      return {
        items: state.items.map(engine =>
          engine._id === action.engine._id
            ?  { ...action.engine }
            : engine
        )
      };
    case engineConstants.UPDATE_IMAGE_BY_ID_FAILURE:
    return {
      ...state,
      items: state.items.map(engine =>
        engine.loading
          ? { ...engine }
          : engine
      ),
      error: action.error
    };
    case engineConstants.DELETE_REQUEST:
      // add 'deleting:true' property to engine being deleted
      return {
        loading: true,
        ...state,
        items: state.items.map(engine =>
          engine._id === action.id
            ? { ...engine, deleting: true }
            : engine
        )
      };
    case engineConstants.DELETE_SUCCESS:
      // remove deleted engine from state
      return {
        items: state.items.filter(engine => engine._id !== action.id)
      };
    case engineConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to engine
      return {
        ...state,
        items: state.items.map(engine => {
          if (engine._id === action.id) {
            // make copy of engine without 'deleting:true' property
            const { deleting, ...engineCopy } = engine;
            // return copy of engine with'deleteError:[error]' property
            return { ...engineCopy, deleteError:action.error };
          }

          return engine;
        }),
        error: action.error
      };
    case engineConstants.RESERVATION_REQUEST:
      // add 'updating:true' property to engine being updated
      return {
        loading: true,
        ...state,
        items: state.items.map(engine => {
          engine._id === action.engine._id && action.engine.reserved.push(action.reservation);
          return engine._id === action.engine._id ? { ...action.engine, updating: true } : engine
        })
      };
    case engineConstants.RESERVATION_SUCCESS:
      return {
        items: state.items.map(engine => {
          return engine._id === action.engine._id ? action.engine : engine
        })
      };
    case engineConstants.RESERVATION_FAILURE:
      //remove updating element
      return {
        items: state.items.map((engine) => {
          if(engine.updating){
            engine.reserved.pop()
          }
          return engine
        }),
        error: action.error
      };
    case engineConstants.UPDATE_REQUEST:
      // add 'updating:true' property to engine being updated
      return {
        loading: true,
        ...state,
        items: state.items.map(engine => (
          engine._id === action.engine._id ? { ...action.engine, updating: true } : engine
        )),
        temp: state.items.map(engine => (
          engine._id === action.engine._id ? { ...engine} : engine
        ))
      };
    case engineConstants.UPDATE_SUCCESS:
      return {
        items: state.items.map(engine => (
          engine._id === action.engine._id ? action.engine : engine
        ))
      };
    case engineConstants.UPDATE_FAILURE:
      //remove updating element
      return {
        items: state.items.map((engine) => (
          engine.updating ? state.temp[0] : engine
        )),
        error: action.error
      };
    default:
      return state
  }
}
