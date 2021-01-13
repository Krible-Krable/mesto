import './index.css';

import { Card } from './../components/Card.js'
import { FormValidator } from './../components/FormValidator.js'
import { Section } from './../components/Section.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { UserInfo } from './../components/UserInfo.js';


const editProfileButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const imgOpenPopup = '.popup_img-open';
const profileName = '.profile__name';
const profileBio = '.profile__bio';
const popupCard = '.popup_card';
const popupProfile = '.popup_profile';
const popupInputName = '.popup__input_type_name';
const popupInputBio = '.popup__input_type_bio';
const popupInputLink = '.popup__input_type_link';
const popupInputPlace = '.popup__input_type_place';
const cardTemplateId = '#card-template';
const validationConfig = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    inactiveButtonClass: 'popup__button-disabled',
    submitButton: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
};







//массив карточек

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


function createCard(label, url, selector) {
    const card = new Card(label, url, selector, function () {
        popupWithImage.open(url, label)
    });
    section.addItem(card.getCardElem());
}

const popupWithImage = new PopupWithImage(imgOpenPopup);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ selectorName: profileName, selectorBio: profileBio });

const popupWithFormProfile = new PopupWithForm(popupProfile, function ({ name, bio }) {
    userInfo.saveUserInfo({ name, bio });
}, {
        name: popupInputName,
        bio: popupInputBio
    });

popupWithFormProfile.setEventListeners();
const formValidator = new FormValidator(validationConfig, popupWithFormProfile.getFormElem());
formValidator.enableValidation();

editProfileButton.addEventListener('click', function () {
    const { name, bio } = userInfo.getUserInfo();

    popupWithFormProfile.open({
        [popupInputName]: name,
        [popupInputBio]: bio
    });
});


const popupWithFormCard = new PopupWithForm(popupCard, function ({ url, label }) {
    createCard(label, url, cardTemplateId);
}, {
        url: popupInputLink,
        label: popupInputPlace
    });

popupWithFormCard.setEventListeners();
const validatorFormCard = new FormValidator(validationConfig, popupWithFormCard.getFormElem());
validatorFormCard.enableValidation();

popupAddCard.addEventListener('click', function () {
    popupWithFormCard.open();
});


const section = new Section({
    items: initialCards, renderer(item) {
        createCard(item.name, item.link, cardTemplateId);
    }
}, '.content');

section.renderCards();





