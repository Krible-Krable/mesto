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
    popupDeleteSelector,
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
import { PopupDelete } from './../components/PopupDelete.js';
import { UserInfo } from './../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup';


const popupDelete = new PopupDelete(popupDeleteSelector);
popupDelete.setEventListeners();

function createCard(label, url, likes, cardId, ownerId, selector) {
    const isOwnCard = userInfo.getUserId() === ownerId;

    const isToggled = likes.find(user => {
        return user._id === userInfo.getUserId();
    });

    const card = new Card(label, url, isOwnCard, selector, function () {
        popupWithImage.open(url, label);
    }, function () {
        // api.deleteCard(cardId);
        popupDelete.open(function () {
            api.deleteCard(cardId);
            card.deleteCard();
        });
    }, function (isWasToggled) {
        if (isWasToggled) {
            api.dislike(cardId).then(res => {
                const isToggled = res.likes.find(user => {
                    return user._id === userInfo.getUserId();
                });

                card.setLikes(res.likes.length, isToggled);
            });
        } else {
            api.like(cardId).then(res => {
                const isToggled = res.likes.find(user => {
                    return user._id === userInfo.getUserId();
                });

                card.setLikes(res.likes.length, isToggled);
            });
        }
    });

    card.setLikes(likes.length, isToggled);

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
    userInfo.saveUserInfo({ name: user.name, bio: user.about, id: user._id }) //ТУТ АПИ
    userInfo.saveUserAvatar(user.avatar);

    api.getInitialCards().then(data => {
        section.renderCards(data);
    })
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
    api.addNewCard(label, url).then(res => {
        const card = createCard(label, url, [], res._id, userInfo.getUserId(), cardTemplateId);
        section.addItem(card.getCardElem());
    });
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
    api.editAvatar(url);
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
        const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id, cardTemplateId);
        section.addItem(card.getCardElem());
    }
}, contentSection);

// section.renderCards();





