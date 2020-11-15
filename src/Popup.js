export class Popup {
    constructor(selectorPopup) {
        this.selectorPopup = selectorPopup;
        this.popup = document.querySelector(this.selectorPopup);
        this.setEventListeners();
    }

    open() {
        this.popup.classList.add('popup_is-opened'); 
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close () {
        this.popup.classList.remove('popup_is-opened');

        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }


    _handleEscClose(evt) {
        const ESCAPE_KEYCODE = 27;

        if (evt.keyCode == ESCAPE_KEYCODE) {
            this.close();
        }
    }

    setEventListeners() {
        const popupCloseButton = this.popup.querySelector(`.popup__button-close`);
        popupCloseButton.addEventListener('click', this.close.bind(this));
    }

}