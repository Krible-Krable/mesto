export class FormValidator {
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
        if (this._hasInValidInput(inputList)) {
            buttonElement.classList.add(this._obj.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._obj.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _hasInValidInput(inputList) {
        return inputList.some(
            (inputElement) => !inputElement.validity.valid
        );  
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
        this._formElement.addEventListener('reset', () => {
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

    resetValidation() {
        const submitButton = this._formElement.querySelector(this._obj.submitButton);
        submitButton.classList.add(this._obj.inactiveButtonClass);
        submitButton.setAttribute('disabled', true);
    }
}

