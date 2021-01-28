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
    profileAvatar,
    popupAvatarEdit,
    popupInputSrcAvatar,
    avatarImg
} from './../utils/constants.js';

import { Card } from './../components/Card.js';
import { FormValidator } from './../components/FormValidator.js';
import { Section } from './../components/Section.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { PopupDelete } from './../components/PopupDelete.js';
import { UserInfo } from './../components/UserInfo.js';
import { Api } from './../components/Api.js';
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
        popupDelete.open(function () {
            api.deleteCard(cardId)
                .then(() => {
                    card.deleteCard();
                    popupDelete.close();
                })
                .catch(err => {
                    console.log(err, 'Ошибка при удалении карточки');
                });
        });
    }, function (isWasToggled) {
        if (isWasToggled) {
            api.dislike(cardId).then(res => {
                card.setLikes(res.likes.length, false)
            })
            .catch(err => {
                console.log(err, 'Ошибка');
            });
        } else {
            api.like(cardId).then(res => {
                card.setLikes(res.likes.length, true);
            })
            .catch(err => {
                console.log(err, 'Ошибка');
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


const popupWithImage = new PopupWithImage(imgOpenPopup);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ selectorName: profileName, selectorBio: profileBio, selectorAvatar: avatarImg });

Promise.all([
    api.getUser(),
    api.getInitialCards()
])
    .then(([user, data]) => {
        userInfo.saveUserInfo({ name: user.name, bio: user.about, id: user._id });
        userInfo.saveUserAvatar(user.avatar);
        section.renderCards(data);
    })
    .catch(err => {
        console.log(err, 'Ошибка при сохранении данных');
    });

const popupWithFormProfile = new PopupWithForm(popupProfile, function ({ name, bio }) {
    api.editDataProfile(name, bio)
        .then(() => {
            userInfo.saveUserInfo({ name, bio });
            popupWithFormProfile.close();
        })
        .catch(err => {
            console.log(err, 'Ошибка при сохранении данных');
        })
        .finally(() => {
            popupWithFormProfile.stopWaitIndication();
        });
}, {
        name: popupInputName,
        bio: popupInputBio
    });

popupWithFormProfile.setEventListeners();

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
    api.addNewCard(label, url)
        .then(res => {
            const card = createCard(label, url, [], res._id, userInfo.getUserId(), cardTemplateId);
            section.addItem(card.getCardElem());
            popupWithFormCard.close();
        })
        .catch(err => {
            console.log(err, 'Ошибка при сохранении данных')
        })
        .finally(() => {
            popupWithFormCard.stopWaitIndication();
        })
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
    api.editAvatar(url)
        .then(() => {
            userInfo.saveUserAvatar(url);
            popupEditAvatar.close();
        })
        .catch(err => {
            console.log(err, 'Ошибка при сохранении данных');
        })
        .finally(() => {
            popupEditAvatar.stopWaitIndication();
        })
},
    {
        url: popupInputSrcAvatar,
    });

const validatorInputAvatar = new FormValidator(validationConfig, popupEditAvatar.getFormElem());
validatorInputAvatar.enableValidation();
popupEditAvatar.setEventListeners();

document.querySelector(profileAvatar).addEventListener('click', function () {
    popupEditAvatar.open();

    validatorInputAvatar.resetValidation();
});

const section = new Section({
    renderer(item) {   
        const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id, cardTemplateId);
        section.addItem(card.getCardElem());
    }
}, contentSection);