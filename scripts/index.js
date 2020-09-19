
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup_profile .popup__button-close');
const popupCloseCard = document.querySelector('.popup_card .popup__button-close');

const buttonLike = document.querySelector('.card__button-like');

const formElement = document.querySelector('.popup__form');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

let inputUserName = document.querySelector('.popup__input_type_name');
let inputUserBio = document.querySelector('.popup__input_type_bio');

// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


const openProfilePopup = function() {

    inputUserName.value = nameUser.textContent;
  
    inputUserBio.value = bioUser.textContent;

    
    profilePopup.classList.add('popup_is-opened');
};

const openCardPopup = function() {
    cardPopup.classList.add('popup_is-opened');
}
const closePopup = function (popup) {
    popup.classList.remove('popup_is-opened');
};

popupOpenButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
});


popupAddCard.addEventListener('click', openCardPopup);
popupCloseCard.addEventListener('click', function() {
    closePopup(cardPopup);
});

// ______________ЭТО СОХРАНЕНИЕ ИНФЫ ПОПАПА__________

const saveForm = function(evt) {
    evt.preventDefault();

    nameUser.textContent = inputUserName.value;
    bioUser.textContent = inputUserBio.value;

    closePopup(profilePopup);
};

formElement.addEventListener('submit', saveForm);

//РЕДАКТИРОВАНИЕ ПОПАПОВ

//_____________________РАБОТА С КАРТОЧКАМИ_______________________

function likeActived() {
    buttonLike.classList.toggle('card__button-like_active');
}

// buttonLike.addEventListener('click', likeActived);


const sectionCard = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки
function addCard(mestoValue, linkValue) {
    // const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки
    const htmlElement = cardTemplate.cloneNode(true);
    htmlElement.querySelector('.card__heading').innerText = mestoValue;
    htmlElement.querySelector('.card__foto').src = linkValue;
    htmlElement.querySelector('.card__foto').setAttribute('alt', mestoValue);    

    sectionCard.appendChild(htmlElement);
}

// ДОБАВЛЕНИЕ 6 КАРТОЧЕК

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



function createCard(initialCards) {
    initialCards.forEach(function(item) {
       addCard(item.name, item.link);
    });
}

createCard(initialCards);

