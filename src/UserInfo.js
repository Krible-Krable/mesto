export class UserInfo {
    constructor({ selectorName, selectorBio }) {
        this.selectorName = selectorName;
        this.selectorBio = selectorBio;
    }

    getUserInfo() {
        const nameUser = document.querySelector(this.selectorName);
        const bioUser = document.querySelector(this.selectorBio);
 
        return {
           name: nameUser.textContent,
           bio: bioUser.textContent,
        };  
    }

    setUserInfo({name, bio}) {
        const nameUser = document.querySelector(this.selectorName);
        const bioUser = document.querySelector(this.selectorBio);

        nameUser.textContent = name;
        bioUser.textContent = bio; 
    }
}