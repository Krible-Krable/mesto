
const popup = document.querySelector('.popup');

const popupOpenButton = document.querySelector('.profile__edit-button');

const popupCloseButton = document.querySelector('.popup__close');

console.log({popup, popupOpenButton, popupCloseButton});

const popupToggle = function() {
    popup.classList.toggle('popup_is-opened');
}

popupToggle();
popupToggle();