import './index.css'; 
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const binImage = new URL('./images/Bin.svg', import.meta.url);
const blackHeartImage = new URL('./images/Close_Icon.svg', import.meta.url);
const closeIconImage = new URL('./images/Edit_button.svg', import.meta.url);
const greyBinImage = new URL('./images/Grey_bin.svg', import.meta.url);
const heartImage = new URL('./images/Heart.svg', import.meta.url);
const mountainsImage = new URL('./images/mountains.png', import.meta.url);
const oldTempleImage = new URL('./images/oldtemple.jpg', import.meta.url);
const sunsetImage = new URL('./images/sunset.png', import.meta.url);
const jacquesYvesCousteauImage = new URL('./images/Jacques_Yves_Cousteau.jpg', import.meta.url);
const plusImage = new URL('./images/Plus.svg', import.meta.url);
const vectorImage = new URL('./images/Vector.svg', import.meta.url);

const interBlackWoffFont = new URL('./vendor/fonts/Inter-Black.woff', import.meta.url);
const interBlackWoffTwoFont = new URL('./vendor/fonts/Inter-Black.woff2', import.meta.url);
const InterMediumWoffFont = new URL('./vendor/fonts/Inter-Medium.woff', import.meta.url);
const InterMediumWoffTwoFont = new URL('./vendor/fonts/Inter-Medium.woff2', import.meta.url);
const InterRegularWoffFont = new URL('./vendor/fonts/Inter-Regular.woff', import.meta.url);
const InterRegularWoffTwoFont = new URL('./vendor/fonts/Inter-Regular.woff2', import.meta.url);


const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Bin', image: binImage },
  { name: 'Black Heart', image: blackHeartImage },
  { name: 'Close Icon', image: closeIconImage },
  { name: 'Grey Bin', image: greyBinImage },
  { name: 'Heart', image: heartImage },
  { name: 'Mountains', image: mountainsImage },
  { name: 'Old Temple', image: oldTempleImage },
  { name: 'Sunset', image: sunsetImage },
  { name: 'Jacques-Yves Cousteau', image: jacquesYvesCousteauImage },
  { name: 'Plus', image: plusImage },
  { name: 'Vector', image: vectorImage },

  { name: 'Inter Black Woff', font: interBlackWoffFont },
  { name: 'Inter Black Woff2', font: interBlackWoffTwoFont },
  { name: 'Inter Medium Woff', font: InterMediumWoffFont },
  { name: 'Inter Medium Woff2', font: InterMediumWoffTwoFont },
  { name: 'Inter Regular Woff', font: InterRegularWoffFont },
  { name: 'Inter Regular Woff2', font: InterRegularWoffTwoFont },
];

const editButton = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__user-name");
const inputName = document.querySelector("#name");
const userDescription = document.querySelector(".profile__user-description");
const inputDescription = document.querySelector("#description");
const titleCardInput = document.querySelector("#card-title");
const imageCardInput = document.querySelector("#card-url");

const addButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#grid-card-template").content;

const popUpPicCaption = document.querySelector("#popup-pic-caption");
const popUpPicImg = document.querySelector("#popup-pic-img");

const popUpEditCard = document.querySelector("#section-popup-edit-profile");
const popUpPicCard = document.querySelector("#section-popup-pic");
const buttonCloseList = document.querySelectorAll(".popup__button-close");
const popUpForm = document.querySelector("#popup__form_add-card");





function openPopUp(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener('keydown', closePopUp)
  window.addEventListener('keydown', (evt) => {
    console.log('Esc', evt.key);
     if (evt.key === 'Escape') {
    closePopUp(popup);
  }
  });
}



function closePopUp(popup) {
  if (popup.code === 'Escape') {
  popup.classList.remove("popup_opened");
  }

  popup.classList.remove("popup_opened");
}

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");

  btn.addEventListener("click", () => closePopUp(popup));
});

editButton.addEventListener("click", () => {
  openPopUp(popUpEditCard);
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
});

document
  .querySelector("#popup__form_edit-profile")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;
  });

function createCard(imgSrc, titleCardValue) {
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(".photo-grid__image");

  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(".photo-grid__card-name").textContent = titleCardValue;

  newCard
    .querySelector(".button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button-like_active");
    });

  newCard
    .querySelector(".button-delete-card")
    .addEventListener("click", function (evt) {
      newCard.remove();
    });

  newCard
    .querySelector(".photo-grid__image")
    .addEventListener("click", function (evt) {
      openPopUp(popUpPicCard);
      popUpPicImg.src = imgSrc;
      popUpPicImg.alt = titleCardValue;
      popUpPicCaption.textContent = titleCardValue;
    });
  return newCard;
}

function renderCard(newCard) {
  cardsContainer.prepend(newCard);
}

initialCards.forEach(function (element) {
  renderCard(createCard(element.link, element.name));
});

addButton.addEventListener("click", (evt) => {
  openPopUp(popUpAddCard);
});

popUpForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard(createCard(imageCardInput.value, titleCardInput.value));
  closePopUp(popUpAddCard);
  popUpForm.reset();
});

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const popupError = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add("popup__item_type_error");
  popupError.textContent = errorMessage;
  popupError.classList.add("name-error_active");

};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const popupError = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove("popup__item_type_error");
  popupError.classList.remove("name-error_active");
  popupError.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  const buttonElement = formElement.querySelector(".popup__button");
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};




const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });

  const popUps = document.querySelectorAll(".popup");
  popUps.forEach((popUpElement) => {
    // popupElement.addEventListener("click", () => {
    //   closePopUp(popupElement);
    // });

    popUpElement.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopUp(popUpElement);
      }
    });
  });
};

// Вызовем функцию
enableValidation();

