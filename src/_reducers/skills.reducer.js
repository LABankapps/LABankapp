import { skillConstants } from '../_constants';

export function skills(state = {}, action) {
  switch (action.type) {
    case skillConstants.GET_SKILL_REQUEST:
      return {
        loading: true,
      };
    case skillConstants.GET_SKILL_SUCCESS:
      return {
        items: action.skill
      };
    case skillConstants.GET_SKILL_FAILURE:
      return {};
    case skillConstants.ADD_SKILL_REQUEST:
      return {
        loading: true,
      };
    case skillConstants.ADD_SKILL_SUCCESS:
      return {};
    case skillConstants.ADD_SKILL_FAILURE:
      return {};
    case skillConstants.DELETE_SKILL_REQUEST:
      return {
        loading: true,
        items: state.items.map(skill => (
          skill.name === action.name ? { ...action.name, deleting: true } : skill
        )),
      };
    case skillConstants.DELETE_SKILL_SUCCESS:
      return {
        items: state.items.filter(skill => skill.name !== action.name)
      };
    case skillConstants.DELETE_SKILL_FAILURE:
    return {
      ...state,
      items: state.items.map(skill => {
        if (skill.name === action.name) {
          // make copy of skill without 'deleting:true' property
          const { deleting, ...skillCopy } = skill;
          // return copy of skill with 'deleteError:[error]' property
          return { ...skillCopy, deleteError: action.error };
        }

        return skill;
      })
    };
    default:
      return state
  }
}
