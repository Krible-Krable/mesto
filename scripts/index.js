
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const imgPopup = document.querySelector('.popup_img-open');

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup_profile .popup__button-close');
const popupCloseCard = document.querySelector('.popup_card .popup__button-close');
const popupCloseImg = document.querySelector('.popup_img-open .popup__button-close');


const formElement = document.querySelector('.popup__form');

let nameUser = document.querySelector('.profile__name');
let bioUser = document.querySelector('.profile__bio');

const sectionCard = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки

const imgLink = document.querySelector('.popup__img');
const labelImg = document.querySelector('.popup__img-label');

let inputUserName = document.querySelector('.popup__input_type_name');
let inputUserBio = document.querySelector('.popup__input_type_bio');

let inputMesto = document.querySelector('.popup__input_type_place');
let inputLink = document.querySelector('.popup__input_type_link');

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

const openImgPopup = function(src, label) {
    imgLink.src = src;
    labelImg.textContent = label;

    imgPopup.classList.add('popup_is-opened');
};



const closePopup = function(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-closing');

    setTimeout(function() {
        popup.classList.add('popup_is-closing');
    }, 500);
};



popupOpenButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', function() {
    closePopup(profilePopup);
});


popupAddCard.addEventListener('click', openCardPopup);
popupCloseCard.addEventListener('click', function() {
    closePopup(cardPopup);
});

popupCloseImg.addEventListener('click', function() {
    closePopup(imgPopup);
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
    const cardFoto = newCard.querySelector('.card__foto');
    newCard.querySelector('.card__heading').innerText = mestoValue;
    newCard.querySelector('.card__foto').src = linkValue;
    newCard.querySelector('.card__foto').setAttribute('alt', mestoValue);    
   
    cardFoto.addEventListener('click', function() {
        openImgPopup(linkValue, mestoValue);
    });
    
    sectionCard.prepend(newCard);
    sectionCard.appendChild(newCard);
    
    buttonDelete.addEventListener('click', function (evt) {
        
        evt.target.parentNode.remove();
    });

    buttonLike.addEventListener('click', function() {
        buttonLike.classList.toggle('card__button-like_active');
    });

}

//добавление массива

function createCard(initialCards) {
    initialCards.forEach(function(item) {
       addCard(item.name, item.link);
    });
}

createCard(initialCards);



