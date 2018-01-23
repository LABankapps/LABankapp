import { skillConstants } from '../_constants';
import { skillService } from '../_services';
import { alertActions } from './';

export const recordActions = {
  getSkill,
  addSkill,
  deleteSkill,
};

function handleError(error){
  if(typeof error !== 'object'){
    return alertActions.error(error);
  }else{
    return alertActions.error('Une erreur est survenue');
  }
}

function getSkill(uad) {
    return dispatch => {
        dispatch(request());

        skillService.getSkill(uad)
            .then(
                skill => {
                    dispatch(success(skill.skill));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: skillConstants.GET_SKILL_REQUEST } }
    function success(skill) { return { type: skillConstants.GET_SKILL_SUCCESS, skill } }
    function failure(error) { return { type: skillConstants.GET_SKILL_FAILURE, error } }
}

function addSkill(uad, skill) {
    return dispatch => {
        dispatch(request());

        skillService.addSkill(uad)
            .then(
                skill => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: skillConstants.ADD_SKILL_REQUEST } }
    function success() { return { type: skillConstants.ADD_SKILL_SUCCESS } }
    function failure(error) { return { type: skillConstants.ADD_SKILL_FAILURE, error } }
}

function deleteSkill(uad, name) {
    return dispatch => {
        dispatch(request(name));

        skillService.deleteSkill(uad, name)
            .then(
                skill => {
                    dispatch(success(name));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(skill) { return { type: skillConstants.DELETE_SKILL_REQUEST, skill } }
    function success() { return { type: skillConstants.DELETE_SKILL_SUCCESS } }
    function failure(error) { return { type: skillConstants.DELETE_SKILL_FAILURE, error } }
}
