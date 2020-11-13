export class PopupWithImage extends Popup {
    constructor(selectorPopup, src, label) {
        super(selectorPopup);
        this.src = src;
        this.label = label;
    }
    open() {
        const imgLink = document.querySelector('.popup__img');
        const labelImg = document.querySelector('.popup__img-label');

        imgLink.src = this.src;
        labelImg.textContent = this.label;
    }
}