export class Section {
    constructor({ items, renderer }, selectorContainer ) {
        this.items = items;
        this.renderer = renderer;
        this.selectorContainer = selectorContainer;
        this.sectionCard = document.querySelector(selectorContainer);
    }

    renderCards() {
        //отрисовка всех элементов
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }

    addItem(newCard) {
        this.sectionCard.prepend(newCard);  //принимает DOM-элемент и добавляет его в контейнер.
    }

}