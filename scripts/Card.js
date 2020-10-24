class Card {
    constructor(text, img, templateSelector) {
        this._img = img;
        this._text = text;
        this._templateSelector = templateSelector;

        this._addMarkup();
        this._addListener();
    }

    _addMarkup() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const newCard = cardTemplate.cloneNode(true);
        this._cardElem = newCard;
        this._buttonLike = newCard.querySelector('.card__button-like');
        this._buttonDelete = newCard.querySelector('.card__button-delete');
        this._cardFoto = newCard.querySelector('.card__foto');

        newCard.querySelector('.card__heading').innerText = this._text;
        this._cardFoto.src = this._img;
        this._cardFoto.setAttribute('alt', this._text);
    }

    _addListener() {
        this._cardFoto.addEventListener('click', this._handlerClickPopup);

        this._buttonDelete.addEventListener('click', this._handlerClickDelete);

        this._buttonLike.addEventListener('click', this._handlerClickLike); 
    }

    _handlerClickPopup = () => {
        openPopup(imgPopup);
        openImgPopup(this._img, this._text);
    }

    _handlerClickDelete(evt) {
        evt.target.parentNode.remove();
    }

    _handlerClickLike = () => {
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    getCardElem() {
        return this._cardElem;
    }
}

//Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
//Принимать в конструктор ссылки на изображение и текст;
//Принимать в конструктор селектор для template - элемента с шаблоном разметки;
//Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;
//Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.




// Каждый класс выполняет строго одну задачу.Всё, что относится к решению этой задачи, находится в классе.
// Ни один другой класс к решению этой задачи не относится.