import { authHeader, url } from '../_helpers';

export const engineService = {
    getAll,
    update,
    create,
    delete: _delete,
    reservation,
    getImageById,
    updateImageById
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url() + '/engines/all', requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function getImageById(engine) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url() + '/engines/img' + engine._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        error: "Mauvais token, Reconnectez vous.",
        json
      })
    ))
    .then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url() + '/engines/' + id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function reservation(engine, reservation) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
  };

    return fetch(url() + '/engines/reservation/' + engine._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function update(engine) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(engine)
  };

    return fetch(url() + '/engines/' + engine._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function updateImageById(engine, img) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader() },
      body: img
  };

    return fetch(url() + '/engines/img/' + engine._id, requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
        json
      })
    ))
    .then(handleResponse);
}

function create(engine) {
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(engine),
  };

    return fetch(url() + '/engines/create', requestOptions).then(response =>
      response.json().then(json => ({
        ok: response.ok,
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
