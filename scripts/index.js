import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

const ESCAPE_KEYCODE = 27;

const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const imgPopup = document.querySelector('.popup_img-open');

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup_profile .popup__button-close');
const popupCloseCard = document.querySelector('.popup_card .popup__button-close');
const popupCloseImg = document.querySelector('.popup_img-open .popup__button-close');

const formElement = document.querySelector('.popup__form');

// const nameUser = document.querySelector('.profile__name');
// const bioUser = document.querySelector('.profile__bio');

const sectionCard = document.querySelector('.content');

// const imgLink = document.querySelector('.popup__img');
// const labelImg = document.querySelector('.popup__img-label');

// const inputUserName = document.querySelector('.popup__input_type_name');
// const inputUserBio = document.querySelector('.popup__input_type_bio');

const inputMesto = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');


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
// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


//функции

// function openPopup(popup) {
//     popup.classList.add('popup_is-opened'); //открытие попапов
//     document.addEventListener('keydown', keydownHandler);
// }


function openProfilePopup() {
    inputUserName.value = nameUser.textContent;
    inputUserBio.value = bioUser.textContent;
}

// function openImgPopup(src, label) {
//     imgLink.src = src;
//     labelImg.textContent = label;
// }

function onCardPhotoClick(img, text) {
    openPopup(imgPopup);
    openImgPopup(img, text);
}

// function closePopup(popup) {
//     popup.classList.remove('popup_is-opened');
//     const form = popup.querySelector('.popup__form');

//     if (form) {
//         form.reset(); //обработчик в validate =>
//     }

//     document.removeEventListener('keydown', keydownHandler);
// }

// function keydownHandler(evt) {
//     const popup = document.querySelector('.popup_is-opened');

//     if (popup && evt.keyCode == ESCAPE_KEYCODE) {
//         closePopup(popup);
//     }
// }

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formElement));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(obj, formElement);
        formValidator.enableValidation();
    });

};

// ______________СОХРАНЕНИЕ__________

function saveForm(evt) {
    evt.preventDefault();

    nameUser.textContent = inputUserName.value;
    bioUser.textContent = inputUserBio.value;

    closePopup(profilePopup);
};

function saveCard(evt) {
    evt.preventDefault();

    const card = new Card(inputMesto.value, inputLink.value, '#card-template', onCardPhotoClick);
    prependToCardSections(card.getCardElem());

    closePopup(cardPopup);
}

function prependToCardSections(newCard) {
    sectionCard.prepend(newCard);
}

//обработчики

popupOpenButton.addEventListener('click', function () {
    openProfilePopup();
    openPopup(profilePopup);
});

popupCloseButton.addEventListener('click', function () {
    closePopup(profilePopup);
});


popupAddCard.addEventListener('click', function () {
    openPopup(cardPopup);
});

popupCloseCard.addEventListener('click', function () {
    closePopup(cardPopup);
});

popupCloseImg.addEventListener('click', function () {
    closePopup(imgPopup);
});

formElement.addEventListener('submit', saveForm);//вот это в попапвизформ?
cardPopup.addEventListener('submit', saveCard);

profilePopup.addEventListener('click', function (evt) {
    if (evt.target === profilePopup) {
        closePopup(profilePopup);
    }
});

cardPopup.addEventListener('click', function (evt) {
    if (evt.target === cardPopup) {
        closePopup(cardPopup);
    }
});

imgPopup.addEventListener('click', function (evt) {
    if (evt.target === imgPopup) {
        closePopup(imgPopup);
    }
});



// function createCard(initialCards) {
//     initialCards.forEach(function (item) {
//         const card = new Card(item.name, item.link, '#card-template', onCardPhotoClick);
//         prependToCardSections(card.getCardElem()); 
//     });
// }

// createCard(initialCards);

const section = new Section({
    items: initialCards, renderer(item) {
        const card = new Card(item.name, item.link, '#card-template', onCardPhotoClick);
        return card.getCardElem();
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




