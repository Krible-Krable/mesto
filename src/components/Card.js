export class Card {
    constructor(text, img, isOwn, templateSelector, onPhotoClick, onDelete, onLike) {
        this._img = img;
        this._text = text;
        this._templateSelector = templateSelector;
        this._onPhotoClick = onPhotoClick;
        this._onDelete = onDelete;
        this._isOwn = isOwn;
        this._onLike = onLike;

        this._addMarkup();
        this._addListener();
    }

    _addMarkup() {
        this._cardElem = this._getCardTemplate();
        this._buttonLike = this._cardElem.querySelector('.card__button-like');
        this._buttonDelete = this._cardElem.querySelector('.card__button-delete');
        this._cardFoto = this._cardElem.querySelector('.card__foto');
        this._likesElem = this._cardElem.querySelector('.card__button-like_count');

        this._cardElem.querySelector('.card__heading').innerText = this._text;
        this._cardFoto.src = this._img;
        this._cardFoto.setAttribute('alt', this._text);
        if (this._isOwn) {
            this._buttonDelete.classList.remove('card__button-delete_hidden');
        }
    }

    _getCardTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _addListener() {
        this._cardFoto.addEventListener('click', this._handlerClickPopup.bind(this));

        this._buttonDelete.addEventListener('click', this._handlerClickDelete.bind(this));

        this._buttonLike.addEventListener('click', this._handlerClickLike.bind(this));
    }

    _handlerClickPopup() {
        this._onPhotoClick(this._img, this._text);
    }

    _handlerClickDelete(evt) {
        this._deleteCard = () => evt.target.parentNode.remove();
        this._onDelete();
    }

    deleteCard() {
        if (this._deleteCard) {
            this._deleteCard();
        }
    }

    _handlerClickLike() {
        this._onLike(this._isToggled);
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    getCardElem() {
        return this._cardElem;
    }

    setLikes(likes, isToggled) {
        this._likesElem.innerText = likes;
        this._isToggled = isToggled;

        if (isToggled) {
            this._buttonLike.classList.add('card__button-like_active');
        } else {
            this._buttonLike.classList.remove('card__button-like_active');
        }
    }
}

