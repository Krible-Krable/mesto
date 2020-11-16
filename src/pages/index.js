import './index.css';

import { Card } from './../components/Card.js'
import { FormValidator } from './../components/FormValidator.js'
import { Section } from './../components/Section.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { UserInfo } from './../components/UserInfo.js';


const editProfileButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');



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


function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formElement));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(obj, formElement);
        formValidator.enableValidation();
    });
};

const popupWithImage = new PopupWithImage('.popup_img-open');
    popupWithImage.setEventListeners();
const userInfo = new UserInfo({ selectorName: '.profile__name', selectorBio: '.profile__bio' });

const popupWithFormProfile = new PopupWithForm('.popup_profile', function({ name, bio }) {
    userInfo.setUserInfo({ name, bio });
}, {
        name: '.popup__input_type_name',
        bio: '.popup__input_type_bio'
});
popupWithFormProfile.setEventListeners();


editProfileButton.addEventListener('click', function () {
    popupWithFormProfile.open();
});


const popupWithFormCard = new PopupWithForm('.popup_card', function({url, label}) {
    const card = new Card(label, url, '#card-template', function () {
        popupWithImage.setSrc(url, label);
        popupWithImage.open()
    });
    section.addItem(card.getCardElem());
}, {
    url: '.popup__input_type_link',
    label: '.popup__input_type_place'
});
popupWithFormCard.setEventListeners();

popupAddCard.addEventListener('click', function () {
    popupWithFormCard.open();
});


const section = new Section({
    items: initialCards, renderer(item) {
        const card = new Card(item.name, item.link, '#card-template', function(){
            popupWithImage.setSrc(item.link, item.name);
            popupWithImage.open()
        });

        section.addItem(card.getCardElem());
    }
}, '.content');

section.renderCards();

enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    inactiveButtonClass: 'popup__button-disabled',
    submitButton: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
});




