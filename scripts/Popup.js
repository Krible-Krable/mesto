export class Popup {
    constructor(selectorPopup) {
        this.selectorPopup = selectorPopup;
        this.popup = document.querySelector(this.selectorPopup);
        this.setEventListeners();
    }

    open() {
        this.popup.classList.add('popup_is-opened'); //открытие попапов
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        this.popup.classList.remove('popup_is-opened');

        document.removeEventListener('keydown', this._handleEscClose);
    }


    _handleEscClose = (evt) => {
        const ESCAPE_KEYCODE = 27;

        //возможно сюда this.selectorPopup и никакого попап
        if (evt.keyCode == ESCAPE_KEYCODE) {
            this.close();
        }
    }

    setEventListeners() {
        //тут ретурн? 
        //добавляет слушатель клика иконке закрытия попапа.
        const popupCloseButton = this.popup.querySelector(`.popup__button-close`);
        popupCloseButton.addEventListener('click', this.close);
    }

}