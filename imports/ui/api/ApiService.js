import { store } from './../store';

export default class ApiService {

  static getHeaders() {
    const { user } = store.getState();
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (user.id) headers['Authorization'] = `Bearer ${user.token}`;

    return headers;
  }

  static get(url) {
    const requestOptions = new Request(url, {
      method: 'GET',
      headers: ApiService.getHeaders()
    });

    return fetch(requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.error) throw response;
        else return { response };
      })
      .catch(error => ({ error }));
  }

  static post(url, data) {
    const requestOptions = new Request(url, {
      method: 'POST',
      headers: ApiService.getHeaders(),
      body: JSON.stringify({...data})
    });

    return fetch(requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.error) throw response;
        else return { response };
      })
      .catch(error => ({ error }));
  }

  static put(url, data) {
    const requestOptions = new Request(url, {
      method: 'PUT',
      headers: ApiService.getHeaders(),
      body: JSON.stringify({...data})
    });

    return fetch(requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.error) throw response;
        else return { response };
      })
      .catch(error => ({ error }));
  }

  static delete(url) {
    const requestOptions = new Request(url, {
      method: 'DELETE',
      headers: ApiService.getHeaders(),
      //body: JSON.stringify({token})
    });

    return fetch(requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.error) throw response;
        else return { response };
      })
      .catch(error => ({ error }));
  }
}