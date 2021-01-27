export class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token; //'ae0317fc-6951-4637-95ad-130db5499c77';
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    }

    getUser() {
        return fetch(`${this._url}/cohort-19/users/me`, {
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    getInitialCards() {
        return fetch(`${this._url}/cohort-19/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    // modify
    editDataProfile(name, about) {
        return fetch(`${this._url}/cohort-19/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cohort-19/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cohort-19/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    like(cardId) {
        return fetch(`${this._url}/cohort-19/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    dislike(cardId) {
        return fetch(`${this._url}/cohort-19/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    editAvatar(avatar) {
        return fetch(`${this._url}/cohort-19/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }
}
