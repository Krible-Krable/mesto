export class Card {
    constructor(text, img, templateSelector) {
        this._img = img;
        this._text = text;
        this._templateSelector = templateSelector;

        this._addMarkup();
        this._addListener();
    }

    _addMarkup() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const newCard = cardTemplate.cloneNode(true);
        this._cardElem = newCard;
        this._buttonLike = newCard.querySelector('.card__button-like');
        this._buttonDelete = newCard.querySelector('.card__button-delete');
        this._cardFoto = newCard.querySelector('.card__foto');

        newCard.querySelector('.card__heading').innerText = this._text;
        this._cardFoto.src = this._img;
        this._cardFoto.setAttribute('alt', this._text);
    }

    _addListener() {
        this._cardFoto.addEventListener('click', this._handlerClickPopup);

        this._buttonDelete.addEventListener('click', this._handlerClickDelete);

        this._buttonLike.addEventListener('click', this._handlerClickLike); 
    }

    _handlerClickPopup = () => {
        openPopup(imgPopup);
        openImgPopup(this._img, this._text);
    }

    _handlerClickDelete(evt) {
        evt.target.parentNode.remove();
    }

    _handlerClickLike = () => {
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    getCardElem() {
        return this._cardElem;
    }
}

