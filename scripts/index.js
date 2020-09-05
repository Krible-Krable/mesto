
const popup = document.querySelector('.popup');

const popupOpenButton = document.querySelector('.profile__edit-button');

const popupCloseButton = document.querySelector('.popup__button-close');

const formElement = document.querySelector('.popup__form');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

let inputUserName = document.querySelector('.popup__input_type_name');
let inputUserBio = document.querySelector('.popup__input_type_bio');

// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


const openPopup = function() {

    inputUserName.value = nameUser.textContent;
  
    inputUserBio.value = bioUser.textContent;

    popup.classList.add('popup_is-opened');
};

const closePopup = function () {
    popup.classList.remove('popup_is-opened');
};

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// ______________ЭТО СОХРАНЕНИЕ ИНФЫ ПОПАПА__________

const saveForm = function(evt) {
    evt.preventDefault();

    nameUser.textContent = inputUserName.value;
    bioUser.textContent = inputUserBio.value;

    closePopup();
};

formElement.addEventListener('submit', saveForm);





