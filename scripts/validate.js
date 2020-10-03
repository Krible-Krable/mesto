//показать ошибку
function showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.inputErrorClass);
}

//скрыть ошибку
function hideInputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(obj.inputErrorClass);

}

//проверить сейчас валидацию
function checkInputValidity(formElement, inputElement, obj) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
}
//события кнопки отменить/отправить
function submitButtonSelector(inputList, buttonElement, obj) {
    const hasInValidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid
    );

    if (hasInValidInput) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function setEventListeners(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputElement));
    const submitButton = formElement.querySelector(obj.submitButton);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, obj);
            submitButtonSelector(inputList, submitButton, obj);
        });
    });
    //очистить поля ошибок на каждом инпуте
    formElement.addEventListener('reset', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, obj);
        });
    });

    submitButtonSelector(inputList, submitButton, obj);
}

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formElement));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, obj);
    });

};

enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    inactiveButtonClass: 'popup__button-disabled',
    submitButton: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
}); 