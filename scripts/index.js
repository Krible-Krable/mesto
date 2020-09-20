
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup_profile .popup__button-close');
const popupCloseCard = document.querySelector('.popup_card .popup__button-close');


const formElement = document.querySelector('.popup__form');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

const sectionCard = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки

let mestoName = document.querySelector('.card__heading');
let mestoLink = document.querySelector('.card__foto');

let inputUserName = document.querySelector('.popup__input_type_name');
let inputUserBio = document.querySelector('.popup__input_type_bio');

let inputMesto = document.querySelector('.popup__input_type_place');
let inputLink = document.querySelector('.popup__input_type_link');
// __________________ЭТО ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА________________


const openProfilePopup = function() {

    inputUserName.value = nameUser.textContent;
  
    inputUserBio.value = bioUser.textContent;

    
    profilePopup.classList.add('popup_is-opened');
};

const openCardPopup = function() {
    cardPopup.classList.add('popup_is-opened');

    inputMesto.value = '';
    inputLink.value = '';
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


const saveCard = function(evt) {
    evt.preventDefault();

    addCard(inputMesto.value, inputLink.value);
    closePopup(cardPopup);
}

cardPopup.addEventListener('submit', saveCard);



//_____________________РАБОТА С КАРТОЧКАМИ_______________________

function addCard(mestoValue, linkValue) {
    // const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки
    const newCard = cardTemplate.cloneNode(true);

    const buttonLike = newCard.querySelector('.card__button-like');
    const buttonDelete = newCard.querySelector('.card__button-delete');
    newCard.querySelector('.card__heading').innerText = mestoValue;
    newCard.querySelector('.card__foto').src = linkValue;
    newCard.querySelector('.card__foto').setAttribute('alt', mestoValue);    
   
    sectionCard.prepend(newCard);
    // sectionCard.appendChild(newCard);
    buttonDelete.addEventListener('click', function (evt) {
        
        evt.target.parentNode.remove();
    });

    buttonLike.addEventListener('click', function() {
        buttonLike.classList.toggle('card__button-like_active');
    });
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

