import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);

        this._imgLink = this._popup.querySelector('.popup__img');
        this._labelImg = this._popup.querySelector('.popup__img-label'); 
    }

    // setSrc(src, label) {
    //     this.src = src;
    //     this.label = label;
    // }

    open(src, label) {
        // this._imgLink.src = this.src;
        // this._labelImg.textContent = this.label;
       
        this._imgLink.src = src;
        this._labelImg.textContent = label;

        super.open();
    }
}