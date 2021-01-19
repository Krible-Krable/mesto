import { Popup } from './Popup.js';
 
 export class PopupWithForm extends Popup {
     constructor(selectorPopup, callback, inputSelectors) {
        super(selectorPopup);

        this.callback = callback;
        this.inputSelectors = inputSelectors;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputValues = {};

        Object.keys(this.inputSelectors).forEach((key) => {
            inputValues[key] = this._popup.querySelector(this.inputSelectors[key]).value;
        });
        //который собирает данные всех полей формы.

        return inputValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => {
            this.callback(this._getInputValues());
            this.close();
        });
        return super.setEventListeners();
    }

    getFormElem() {
        return this._form;
    }

    close() {
        this._form.reset();
        super.close();
    }
}