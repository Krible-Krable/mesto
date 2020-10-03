// enableValidation({
//     formElement: '.popup__form',+
//     inputElement: '.popup__input',+
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button-disabled',+
//     inputErrorClass: 'popup__input_type_error',+
//     errorClass: 'popup__error_visible'
// }); 

// const formElement = document.querySelectorAll('.popup__form');
// const inputElement = document.querySelectorAll('.popup__input');
// const submitButtonSelector = document.querySelectorAll('.popup__button');
// const inactiveButtonClass = document.querySelectorAll('.popup__button-disabled')
// const inputErrorClass = document.querySelectorAll('.popup__input_type_error');
// const errorClass = document.querySelectorAll('.popup__error_visible');



function exiteFromPopup(popup) {

    document.addEventListener('keydown', function (evt) {
        if (evt.keyCode == 27) {
            closePopup(popup);
        }
    });

    popup.addEventListener('click', function (evt) {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
}
exiteFromPopup(profilePopup);
exiteFromPopup(cardPopup);



function showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.inputErrorClass);
};


function hideInputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(obj.inputErrorClass);

};


function checkInputValidity(formElement, inputElement, obj) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};



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

    formElement.addEventListener('reset', () => {
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, obj);
        });
    });

    submitButtonSelector(inputList, submitButton, obj);
};




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