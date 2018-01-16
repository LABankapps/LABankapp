import { authHeader, url } from '../_helpers';

export const recordService = {
    getByUserId,
    update,
};

function update(record) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
  };

    return fetch(url() + '/records/' + record._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
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

function handleResponse({ok, error = "", json}) {
    if (!ok) {
        return Promise.reject(error !== "" ? error : json.error);
    }

    return json;
}
