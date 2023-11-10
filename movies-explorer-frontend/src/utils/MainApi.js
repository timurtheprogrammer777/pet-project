// ssssssssssssssssss
const token = localStorage.getItem('jwt');
const configApi = {
    baseUrl: 'https://api.timur.app.nomoreparties.co',
    headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
    }
}

export default class Api {
    constructor(apiConfig) {
        this._baseUrl = apiConfig.baseUrl;
        this._headers = apiConfig.headers;
        this.currentUserId = null;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


    setToken(token) {
        this._headers.authorization = `Bearer ${token}`;
    }
    
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify(data)
            })
            .then(this._checkResponse);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    
    deleteMovie(movieId) {

        return fetch(`${this._baseUrl}/movies/${movieId}`, {
                method: 'DELETE',
                headers: this._headers,
                body: JSON.stringify()
            })
            .then(this._checkResponse);
    }


    createMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify(data)
            })
            .then(this._checkResponse);
    }
}

export const api = new Api(configApi);
