
const popup = document.querySelector('.popup');

const popupOpenButton = document.querySelector('.profile__edit-button');

const popupCloseButton = document.querySelector('.popup__button-close');

const formElement = document.querySelector('.popup__form');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

let inputUserName = document.querySelector('.popup__input_type_name');
let inputUserBio = document.querySelector('.popup__input_type_bio');

// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


const openPopup = function(event) {
        // target: event.target,
        // currentTarget: event.currentTarget;

    popup.classList.add('popup_is-opened');

    let completedFormName = nameUser.textContent;
    inputUserName.value = completedFormName;

    let completedFormBio = bioUser.textContent;
    inputUserBio.value =  completedFormBio;
}

const closePopup = function (event) {
    popup.classList.remove('popup_is-opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// ______________ЭТО СОХРАНЕНИЕ ИНФЫ ПОПАПА__________

const saveForm = function(evt) {
    evt.preventDefault();

    let nameValue = inputUserName.value;
    let itSelfValue = inputUserBio.value;

    nameUser.textContent = nameValue;
    bioUser.textContent = itSelfValue;

    closePopup();
}

formElement.addEventListener('submit', saveForm);





