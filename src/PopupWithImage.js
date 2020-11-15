import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    setSrc(src, label) {
        this.src = src;
        this.label = label;
    }

    open() {
        const imgLink = this.popup.querySelector('.popup__img');
        const labelImg = this.popup.querySelector('.popup__img-label');

        imgLink.src = this.src;
        labelImg.textContent = this.label;

        super.open();
    }
}