export class Popup {
    constructor(selectorPopup) {
        this.selectorPopup = selectorPopup;
    }

    open() {
        popup.classList.add(this.selectorPopup); //открытие попапов
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        const popup = document.querySelector(this.selectorPopup);

        popup.classList.remove(this.selectorPopup);

        document.removeEventListener('keydown', this._handleEscClose);
    }


    _handleEscClose = () => {
        const ESCAPE_KEYCODE = 27;

        //возможно сюда this.selectorPopup и никакого попап
        if (evt.keyCode == ESCAPE_KEYCODE) {
            this.close();
        }
    }

    setEventListeners() {
        //тут ретурн? 
        //добавляет слушатель клика иконке закрытия попапа.
        const popupCloseButton = document.querySelector(`${this.selectorPopup} .popup__button-close`);
        popupCloseButton.addEventListener('click', this.close);
    }

}