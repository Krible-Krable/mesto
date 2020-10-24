//  const config = {
//      profilePopup: document.querySelector('.popup_profile'),
//      cardPopup: document.querySelector('.popup_card'),
//      imgPopup: document.querySelector('.popup_img-open'),

//      popupOpenButton: document.querySelector('.profile__edit-button'),
//      popupAddCard: document.querySelector('.profile__add-button'),
//      popupCloseButton: document.querySelector('.popup_profile .popup__button-close'),
//      popupCloseCard: document.querySelector('.popup_card .popup__button-close'),
//      popupCloseImg: document.querySelector('.popup_img-open .popup__button-close'),

//      formElement: document.querySelector('.popup__form'),
//      editCardForm: document.querySelector('.popup_card .popup__form'),

//      nameUser: document.querySelector('.profile__name'),
//      bioUser: document.querySelector('.profile__bio'),

//      sectionCard: document.querySelector('.content'),
//      cardTemplate: document.querySelector('#card-template').content, //темплейт карточки

//      imgLink: document.querySelector('.popup__img'),
//      labelImg: document.querySelector('.popup__img-label'),

//      inputUserName: document.querySelector('.popup__input_type_name'),
//      inputUserBio: document.querySelector('.popup__input_type_bio'),

//      inputMesto: document.querySelector('.popup__input_type_place'),
//      inputLink: document.querySelector('.popup__input_type_link'),
// }


const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const imgPopup = document.querySelector('.popup_img-open');

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup_profile .popup__button-close');
const popupCloseCard = document.querySelector('.popup_card .popup__button-close');
const popupCloseImg = document.querySelector('.popup_img-open .popup__button-close');

const formElement = document.querySelector('.popup__form');
const editCardForm = document.querySelector('.popup_card .popup__form');

const nameUser = document.querySelector('.profile__name');
const bioUser = document.querySelector('.profile__bio');

const sectionCard = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; //темплейт карточки

const imgLink = document.querySelector('.popup__img');
const labelImg = document.querySelector('.popup__img-label');

const inputUserName = document.querySelector('.popup__input_type_name');
const inputUserBio = document.querySelector('.popup__input_type_bio');

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

function openPopup(popup) {
    popup.classList.add('popup_is-opened'); //открытие попапов
    document.addEventListener('keydown', keydownHandler);
}


function openProfilePopup() {
    inputUserName.value = nameUser.textContent;
    inputUserBio.value = bioUser.textContent;
}

function openImgPopup(src, label) {
    imgLink.src = src;
    labelImg.textContent = label;
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    const form = popup.querySelector('.popup__form');

    if (form) {
        form.reset(); //обработчик в validate =>
    }

    document.removeEventListener('keydown', keydownHandler);
}

function keydownHandler(evt) {
    const popup = document.querySelector('.popup_is-opened');

    if (popup && evt.keyCode == 27) {
        closePopup(popup);
    }
}

// ______________СОХРАНЕНИЕ__________

function saveForm(evt) {
    evt.preventDefault();

    nameUser.textContent = inputUserName.value;
    bioUser.textContent = inputUserBio.value;

    closePopup(profilePopup);
};

function saveCard(evt) {
    evt.preventDefault();

    prependToCardSections(addCard(inputMesto.value, inputLink.value));
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

formElement.addEventListener('submit', saveForm);
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



//_____________________РАБОТА С КАРТОЧКАМИ_______________________




// function addCard(mestoValue, linkValue) {
//     const newCard = cardTemplate.cloneNode(true);

//     const buttonLike = newCard.querySelector('.card__button-like');
//     const buttonDelete = newCard.querySelector('.card__button-delete');
//     const cardFoto = newCard.querySelector('.card__foto');
//     newCard.querySelector('.card__heading').innerText = mestoValue;
//     cardFoto.src = linkValue;
//     cardFoto.setAttribute('alt', mestoValue);

//     cardFoto.addEventListener('click', function () {
//         openPopup(imgPopup);
//         openImgPopup(linkValue, mestoValue);
//     });

//     buttonDelete.addEventListener('click', function (evt) {
//         evt.target.parentNode.remove();
//     });

//     buttonLike.addEventListener('click', function () {
//         buttonLike.classList.toggle('card__button-like_active');
//     });

//     return newCard;
// }

//добавление массива

function createCard(initialCards) {
    initialCards.forEach(function (item) {
        const card = new Card(item.name, item.link, '#card-template');
        prependToCardSections(card.getCardElem()); 
    });
}

createCard(initialCards);




