import { authHeader, url } from '../_helpers';

export const recordService = {
    getByUserId,
    approve,
    getAll
};

function approve(id) {
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
    return fetch(url() + '/records/' + id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function getByUserId(id) {
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

    return fetch(url() + '/records/' + id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function getAll() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(url() + '/records/all', requestOptions).then(response =>
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
