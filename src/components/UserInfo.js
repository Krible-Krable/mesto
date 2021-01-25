export class UserInfo {
    constructor({ selectorName, selectorBio, selectorAvatar, }) {
        this.selectorName = selectorName;
        this.selectorBio = selectorBio;
        this.selectorAvatar = selectorAvatar;
        this._nameUser = document.querySelector(selectorName);
        this._bioUser = document.querySelector(selectorBio);
        this._avatarUser = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            bio: this._bioUser.textContent,
        };
    }

    saveUserInfo({ name, bio, id }) {
        this._nameUser.textContent = name;
        this._bioUser.textContent = bio;
        this._id = id;
    }

    saveUserAvatar(url) {
        this._avatarUser.src = url;
    }

    getUserId() {
        return this._id;
    }
}