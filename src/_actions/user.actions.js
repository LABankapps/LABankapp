import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    registerBlockChainID,
    getAll,
    getById,
    addBalance,
    update,
    updatePassword,
    delete: _delete,
    getBalance,
    resetPsswd
};

function handleError(error){
  if(typeof error !== 'object'){
    return alertActions.error(error);
  }else{
    return alertActions.error('Une erreur est survenue');
  }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function registerBlockChainID(user) {
    return dispatch => {
        dispatch(request());

        userService.registerBlockChainID()
            .then(
                blockChain => {
                    dispatch(success(user, blockChain.uad));
                    user.blockChainId = blockChain.uad;
                    dispatch(register(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getBalance(user){
  return dispatch => {
      dispatch(request());

      userService.getBalance(user.profile.blockChainId)
          .then(
              blockChain => {
                  dispatch(success(user, blockChain.balance));
              },
              error => {
                  dispatch(failure(error));
                  dispatch(handleError(error));
              }
          );
  };

  function request() { return { type: userConstants.BALANCE_REQUEST } }
  function success(user, balance) { return { type: userConstants.BALANCE_SUCCESS, user, balance } }
  function failure(error) { return { type: userConstants.BALANCE_FAILURE, error } }
}

function addBalance(user, amount){
  return dispatch => {
      dispatch(request());

      userService.addBalance(user.profile.blockChainId, amount)
          .then(
              blockChain => {
                  dispatch(success(user, amount));
              },
              error => {
                  dispatch(failure(error));
                  dispatch(handleError(error));
              }
          );
  };

  function request() { return { type: userConstants.ADD_BALANCE_REQUEST } }
  function success(user, amount) { return { type: userConstants.ADD_BALANCE_SUCCESS, user, amount } }
  function failure(error) { return { type: userConstants.ADD_BALANCE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => { dispatch(success(users.users));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
  }

  function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user.user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user} }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
  }

  function updatePassword(user, password) {
    return dispatch => {
        dispatch(request(user));

        userService.updatePassword(user, password)
            .then(
                user => {
                    dispatch(success(user.user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user} }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
  }

  function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => {
                    dispatch(success([user.user]));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
  }

  function resetPsswd(email) {
    return dispatch => {
        dispatch(request(email));

        userService.resetPsswd(email)
            .then(
                user => {
                    dispatch(success(email));
                    dispatch(alertActions.success("Email envoyé à " + email));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(handleError(error));
                }
            );
    };

    function request(emailemail) { return { type: userConstants.PSSWD_REQUEST, email} }
    function success(email) { return { type: userConstants.PSSWD_SUCCESS, email } }
    function failure(error) { return { type: userConstants.PSSWD_FAILURE, error } }
  }
