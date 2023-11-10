const configAuthApi = {
  baseUrl: 'https://api.timur.app.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
};


export default class AuthApi {
  constructor(configAuthApi) {
    this._baseUrl = configAuthApi.baseUrl;
    this._headers = configAuthApi.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  signup({
    password,
    email,
    name
  }) {
    return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          password,
          email,
          name
        })
      })
      .then(this._checkResponse);
  }

  signin({
    password,
    email
  }) {
    return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          password,
          email
        })
      })
      .then(this._checkResponse);
  }

  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`
        }
      })
      .then(this._checkResponse);
  }
  
}

export const authApi = new AuthApi(configAuthApi);
