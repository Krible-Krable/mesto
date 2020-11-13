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
            const card = this.renderer(item);
            this.addItem(card);
        });
    }

    addItem(newCard) {
        this.sectionCard.prepend(newCard);  //который принимает DOM-элемент и добавляет его в контейнер.
    }

}