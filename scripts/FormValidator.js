class FormValidator {
    constructor(obj, formElement) {
        this._obj = obj;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._obj.inputErrorClass);
}

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.textContent = '';
        errorElement.classList.remove(this._obj.inputErrorClass);

}

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;

        if (isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _submitButtonSelector(inputList, buttonElement) {
        const hasInValidInput = inputList.some(
            (inputElement) => !inputElement.validity.valid
        );

        if (hasInValidInput) {
            buttonElement.classList.add(this._obj.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._obj.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputElement));
        const submitButton = this._formElement.querySelector(this._obj.submitButton);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._submitButtonSelector(inputList, submitButton);
            });
        });
        //очистить поля ошибок на каждом инпуте
        formElement.addEventListener('reset', () => {
            inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            });
        });

        this._submitButtonSelector(inputList, submitButton);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });

        this._setEventListeners();   
    }
}



// Экземпляр класса FormValidator создаётся для каждой проверяемой формы.Этот класс должен:
// Принимать в конструктор объект настроек с классами формы;
// Принимать в конструктор ссылку на HTML - элемент проверяемой формы;
// Содержать приватные методы для обработки формы;
// «Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса».


// Каждый класс выполняет строго одну задачу.Всё, что относится к решению этой задачи, находится в классе.
// Ни один другой класс к решению этой задачи не относится.