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
validationConfig 
} from './../utils/constants.js';

import { initialCards } from './../initial-cards.js';

import { Card } from './../components/Card.js'
import { FormValidator } from './../components/FormValidator.js'
import { Section } from './../components/Section.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { UserInfo } from './../components/UserInfo.js';


function createCard(label, url, selector) {
    const card = new Card(label, url, selector, function () {
        popupWithImage.open(url, label);
    });
    return card; 
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
    popupWithFormProfile.open();

    const userData = userInfo.getUserInfo();

    document.querySelector(popupInputName).value = userData.name;
    document.querySelector(popupInputBio).value = userData.bio;
    formValidator.resetValidation();
});


const popupWithFormCard = new PopupWithForm(popupCard, function ({ url, label }) {
    const card = createCard(label, url, cardTemplateId);
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


const section = new Section({
    items: initialCards, renderer(item) {
       const card = createCard(item.name, item.link, cardTemplateId);
        section.addItem(card.getCardElem()); 
    }
}, contentSection);

section.renderCards();





