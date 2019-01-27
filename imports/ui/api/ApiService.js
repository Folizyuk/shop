export default class ApiService {

  static get(url) {
    const requestOptions = new Request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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