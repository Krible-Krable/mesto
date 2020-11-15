import { Popup } from './Popup.js';
 
 export class PopupWithForm extends Popup {
     constructor(selectorPopup, callback) {
        super(selectorPopup);

        this.callback = callback;
    }

    _getInputValues() {
        //который собирает данные всех полей формы.
        const inputUserName = document.querySelector(`${this.selectorPopup} .popup__input_type_name`);
        const inputUserBio = document.querySelector(`${this.selectorPopup} .popup__input_type_bio`);

        return {
            name: inputUserName.value,
            bio: inputUserBio.value
        };
    }

    setEventListeners() {
        // const popupCloseButton = document.querySelector(`${this.selectorPopup} .popup__button-close`);
        // popupCloseButton.addEventListener('click', this.close);
        const popup = document.querySelector(this.selectorPopup);

        const form = popup.querySelector('.popup__form');

        form.addEventListener('submit', () => {
            this.callback(this._getInputValues());
        });
        return super.setEventListeners();
    }

    close = () => {
         const popup = document.querySelector(this.selectorPopup);
         const form = popup.querySelector('.popup__form');

         if (form) {
             form.reset(); //обработчик в validate =>
         }
         return super.close();
    }
}