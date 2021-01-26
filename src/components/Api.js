export class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token; //'ae0317fc-6951-4637-95ad-130db5499c77';
    }

    getUser() {
        return fetch(`${this._url}/cohort-19/users/me`, {
            headers: {
                authorization: this._token,
            }
        })
            .then(result => {
                if (result.ok) {
                    console.log('yoohooo!');
                    return result.json();
                }
                return Promise.reject(`Error: ${result.status}`)
            })
            .catch(err => {
                console.log(err);
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
                if (res.ok) {
                    console.log('ура!');
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
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
            .then(result => {
                if (result.ok) {
                    console.log('пришел изменить профиль!');
                    return result.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
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
            .then(result => {
                if (result.ok) {
                    console.log('yoohooo!');
                    return result.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cohort-19/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(result => {
                if (result.ok) {
                    console.log('yoohooo!');
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    like(cardId) {
        return fetch(`${this._url}/cohort-19/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        })
            .then(result => {
                if (result.ok) {
                    console.log('пришел изменить лайк!');
                    return result.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    dislike(cardId) {
        return fetch(`${this._url}/cohort-19/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(result => {
                if (result.ok) {
                    console.log('пришел изменить лайк!');
                    return result.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
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
            .then(result => {
                if (result.ok) {
                    console.log('пришел изменить профиль!');
                    return result.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
            .catch(err => {
                console.log(err);
            })
    }
}
