const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  // Находим элемент ошибки внутри самой функции
  const popupError = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(parameters.inputErrorClass);
  popupError.textContent = errorMessage;
  popupError.classList.add(parameters.errorClass);

};

const hideInputError = (formElement, inputElement, parameters) => {
  // Находим элемент ошибки
  const popupError = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(parameters.inputErrorClass);
  popupError.classList.remove(parameters.errorClass);
  popupError.textContent = "";
};

const isValid = (formElement, inputElement, parameters) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, parameters) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(parameters.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, parameters) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.sumbitButtonSelector);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, parameters);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};




export const enableValidation = (parameters) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  // const formList = Array.from(document.querySelectorAll(".popup__form"));
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, parameters);
  });

  const popUps = document.querySelectorAll(parameters.popupSelector);
  popUps.forEach((popUpElement) => {
    popUpElement.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopUp(popUpElement);
      }
    });
  });
};