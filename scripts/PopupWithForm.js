import { Popup } from './Popup.js';
 
 export class PopupWithForm extends Popup {
     constructor(selectorPopup, callback, inputSelectors) {
        super(selectorPopup);

        this.callback = callback;
        this.inputSelectors = inputSelectors;
    }

    _getInputValues() {
        const inputValues = {};

        Object.keys(this.inputSelectors).forEach((key) => {
            inputValues[key] = this.popup.querySelector(this.inputSelectors[key]).value;
        });
        //который собирает данные всех полей формы.

        return inputValues;
    }

    setEventListeners() {
        // const popupCloseButton = document.querySelector(`${this.selectorPopup} .popup__button-close`);
        // popupCloseButton.addEventListener('click', this.close);
        const popup = document.querySelector(this.selectorPopup);

        const form = popup.querySelector('.popup__form');

        form.addEventListener('submit', () => {
            this.callback(this._getInputValues());
            this.close();
        });
        return super.setEventListeners();
    }

    close() {
         const popup = document.querySelector(this.selectorPopup);
         const form = popup.querySelector('.popup__form');

         if (form) {
             form.reset(); //обработчик в validate =>
         }

         return super.close();
    }
}