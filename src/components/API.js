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
                console.log('govno');
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
            .catch((err) => {
                console.log(err);
                console.log('не получилось');
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
                console.log('govno');
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
                console.log('govno');
            })
    }
}