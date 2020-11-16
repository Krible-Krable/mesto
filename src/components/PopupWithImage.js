import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);

        this._imgLink = this._popup.querySelector('.popup__img');
        this._labelImg = this._popup.querySelector('.popup__img-label'); 
    }

    setSrc(src, label) {
        this.src = src;
        this.label = label;
    }

    open() {
        this._imgLink.src = this.src;
        this._labelImg.textContent = this.label;

        super.open();
    }
}