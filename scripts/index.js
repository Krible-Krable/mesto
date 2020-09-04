
const popup = document.querySelector('.popup');

const popupOpenButton = document.querySelector('.profile__edit-button');

const popupCloseButton = document.querySelector('.popup__close');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

let inputUserName = document.querySelector('.popup__input_name');
let inputUserBio = document.querySelector('.popup__input_bio');

// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


const popupToggle = function(event) {
    console.log({
        target: event.target,
        currentTarget: event.currentTarget,
    });
    popup.classList.toggle('popup_is-opened');

    let completedFormName = nameUser.textContent;
    inputUserName.value = completedFormName;

    let completedFormBio = bioUser.textContent;
    inputUserBio.value =  completedFormBio;
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);


// ______________ЭТО СОХРАНЕНИЕ ИНФЫ ПОПАПА__________

const formElement = document.querySelector('.popup__form');

const saveForm = function(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('.popup__input_name');
    let itSelfInput = document.querySelector('.popup__input_bio');

    let nameValue = nameInput.value;
    let itSelfValue = itSelfInput.value;

    let profileName = document.querySelector('.profile__name');

    let profileItSelf = document.querySelector('.profile__bio'); 


    profileName.textContent = nameValue;
    profileItSelf.textContent = itSelfValue;

    popup.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', saveForm);





