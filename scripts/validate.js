
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



function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_type_error');
    
};


function hideInputError(formElement, inputElement) {

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove('popup__input_type_error');

};



function checkInputValidity(formElement, inputElement) {
    console.log(inputElement.validity);
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        console.log(errorMessage);
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};



function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));



    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);

        });


    });
};


function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));



    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

        });

        setEventListeners(formElement);

    });

    
};

enableValidation();