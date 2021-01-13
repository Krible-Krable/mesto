export class Popup {
    constructor(selectorPopup) {
        this.selectorPopup = selectorPopup;
        this._popup = document.querySelector(this.selectorPopup);
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_is-opened'); 
        document.addEventListener('keydown', this._handleEscCloseBinded);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscCloseBinded);
    }


    _handleEscClose(evt) {
        const ESCAPE_KEYCODE = 27;

        if (evt.keyCode == ESCAPE_KEYCODE) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {
        const popupCloseButton = this._popup.querySelector(`.popup__button-close`);
        popupCloseButton.addEventListener('click', this.close.bind(this));

        this._popup.addEventListener('click', this._handleOverlayClick.bind(this));
    }

}