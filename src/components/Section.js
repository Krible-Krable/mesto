export class Section {
    constructor({ renderer }, selectorContainer) {     //items, убрала
        // this.items = items;
        this.renderer = renderer;
        this.selectorContainer = selectorContainer;
        this.sectionCard = document.querySelector(selectorContainer);
    }

    renderCards(items) {
        //отрисовка всех элементов
        items.forEach((item) => {
            this.renderer(item);
        });
    }

    addItem(newCard) {
        this.sectionCard.prepend(newCard);  //принимает DOM-элемент и добавляет его в контейнер.
    }

}