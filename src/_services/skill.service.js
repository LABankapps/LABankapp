import { authHeader, url } from '../_helpers';

export const skillService = {
  getSkill,
  addSkill,
  deleteSkill,
};

function getSkill(uad) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url() + '/blockchain/skills/' + uad, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function addSkill(uad, skill) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    
    return fetch(url() + '/blockchain/skill/' + uad + '/' + skill, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function deleteSkill(uad, skill) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url() + '/blockchain/skill/' + uad + '/' + skill, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function handleResponse({ok, error = "", json}) {
    if (!ok) {
        return Promise.reject(error !== "" ? error : json.error);
    }

    return json;
}
