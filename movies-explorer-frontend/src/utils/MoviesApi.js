const configMoviesApi = {
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'content-type': 'application/json'
    }
}

export default class MoviesApi {
    constructor(configMoviesApi) {
        this._baseUrl = `https://api.nomoreparties.co/beatfilm-movies`;
        this._headers = configMoviesApi.headers;
        this.currentUserId = null;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

}

export const apiMovies = new MoviesApi(configMoviesApi);
