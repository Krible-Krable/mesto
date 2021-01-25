export class Card {
    constructor(text, img, likes, isOwn, templateSelector, onPhotoClick, onDelete) {
        this._img = img;
        this._text = text;
        this._templateSelector = templateSelector;
        this._onPhotoClick = onPhotoClick;
        this._likes = likes;
        this._onDelete = onDelete;
        this._isOwn = isOwn;

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
        this._likesElem.innerText = this._likes.length;
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
        evt.target.parentNode.remove();
        this._onDelete();
    }

    _handlerClickLike() {
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    getCardElem() {
        return this._cardElem;
    }


}

