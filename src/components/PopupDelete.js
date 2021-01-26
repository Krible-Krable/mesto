import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
    constructor(selectorPopup, callback, inputSelectors) {
        super(selectorPopup);

        this._deleteButton = this._popup.querySelector('.popup__button');
    }

    open(onDelete) {
        const deleteClickHandler = ((e) => {
            e.preventDefault();
            onDelete();
            this._deleteButton.removeEventListener('click', deleteClickHandler);
            this.close();
        }).bind(this);

        this._deleteButton.addEventListener('click', deleteClickHandler);
        return super.open();
    }
}