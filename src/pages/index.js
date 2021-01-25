import './index.css';

import {
    editProfileButton,
    popupAddCard,
    imgOpenPopup,
    profileName,
    profileBio,
    popupCard,
    popupProfile,
    popupInputName,
    popupInputBio,
    popupInputLink,
    popupInputPlace,
    cardTemplateId,
    contentSection,
    validationConfig,
    likeButton,
    countLike,
    profileAvatar,
    formDelete,
    popupAvatarEdit,
    popupInputSrcAvatar,
    avatarImg
} from './../utils/constants.js';

import { initialCards } from './../initial-cards.js';

import { Card } from './../components/Card.js'
import { FormValidator } from './../components/FormValidator.js'
import { Section } from './../components/Section.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { UserInfo } from './../components/UserInfo.js';
import { Api } from '../components/Api.js';



function createCard(label, url, likes, selector) {
    const card = new Card(label, url, likes, selector, function () {
        popupWithImage.open(url, label);
    });
    return card;
}


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1',
    token: 'ae0317fc-6951-4637-95ad-130db5499c77'
});

// api.getUser().then(user => {
//     user
// });




const popupWithImage = new PopupWithImage(imgOpenPopup);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ selectorName: profileName, selectorBio: profileBio, selectorAvatar: avatarImg });

api.getUser().then(user => {
    userInfo.saveUserInfo({ name: user.name, bio: user.about }) //ТУТ АПИ
});


const popupWithFormProfile = new PopupWithForm(popupProfile, function ({ name, bio }) {
    userInfo.saveUserInfo({ name, bio });
    api.editDataProfile(name, bio);
}, {
        name: popupInputName,
        bio: popupInputBio
    });

popupWithFormProfile.setEventListeners();


// const popupWithFormProfile = new PopupWithForm(popupProfile, function ({ name, bio }) {
//     userInfo.saveUserInfo({ name, bio });
// }, {
//         name: popupInputName,
//         bio: popupInputBio
//     });

// popupWithFormProfile.setEventListeners();
const formValidator = new FormValidator(validationConfig, popupWithFormProfile.getFormElem());
formValidator.enableValidation();

editProfileButton.addEventListener('click', function () {
    popupWithFormProfile.open();

    const userData = userInfo.getUserInfo();

    document.querySelector(popupInputName).value = userData.name;
    document.querySelector(popupInputBio).value = userData.bio;
    formValidator.resetValidation();
});

//попап создания карточки
const popupWithFormCard = new PopupWithForm(popupCard, function ({ url, label }) {
    const card = createCard(label, url, [], cardTemplateId);
    section.addItem(card.getCardElem());
}, {
        url: popupInputLink,
        label: popupInputPlace
    });

popupWithFormCard.setEventListeners();

const validatorFormCard = new FormValidator(validationConfig, popupWithFormCard.getFormElem());
validatorFormCard.enableValidation();

popupAddCard.addEventListener('click', function () {
    popupWithFormCard.open();
    validatorFormCard.resetValidation();
});

//попап аватара

const popupEditAvatar = new PopupWithForm(popupAvatarEdit, function ({ url }) {
    userInfo.saveUserAvatar(url);
},
    {
        url: popupInputSrcAvatar,
    });

const validatorInputAvatar = new FormValidator(validationConfig, popupEditAvatar.getFormElem());
validatorInputAvatar.enableValidation();
popupEditAvatar.setEventListeners();

profileAvatar.addEventListener('click', function () {
    popupEditAvatar.open();

    validatorInputAvatar.resetValidation();
});


// const section = new Section({
//     items: data, renderer(item) {                       //initialCards, принимал айтемс
//         const card = createCard(item.name, item.link, cardTemplateId);
//         section.addItem(card.getCardElem());
//     }
// }, contentSection);

// section.renderCards();

const section = new Section({
    renderer(item) {                       //initialCards, принимал айтемс
        const card = createCard(item.name, item.link, item.likes, cardTemplateId);
        section.addItem(card.getCardElem());
    }
}, contentSection);

// section.renderCards();

api.getInitialCards().then(data => {
    // const card = createCard(label, url, cardTemplateId);
    // section.addItem(card.getCardElem());
    section.renderCards(data);
})



