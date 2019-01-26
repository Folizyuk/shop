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
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .then(data => data)
      .catch(error => null);
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
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .then(data => data)
      .catch(error => null);
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
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .then(data => data)
      .catch(error => null);
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
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .then(data => data)
      .catch(error => null);
  }
}