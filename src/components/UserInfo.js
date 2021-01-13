export class UserInfo {
    constructor({ selectorName, selectorBio }) {
        this.selectorName = selectorName;
        this.selectorBio = selectorBio;

        this._nameUser = document.querySelector(selectorName);
        this._bioUser = document.querySelector(selectorBio);
    }

    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            bio: this._bioUser.textContent,
        };
    }

    saveUserInfo({ name, bio }) {
        this._nameUser.textContent = name;
        this._bioUser.textContent = bio;
    }
}