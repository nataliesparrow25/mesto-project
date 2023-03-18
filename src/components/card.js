import { openPopUp, closePopUp } from "/src/components/utils";


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let parameters = {};

function createCard(imgSrc, titleCardValue) {
  const popUpPicCaption = document.querySelector(
    parameters.popUpPicCaptionSelector
  );
  const popUpPicCard = document.querySelector(
    parameters.sectionPopUpPicSelector
  );
  const popUpPicImg = document.querySelector(parameters.popUpPicImgSelector);
  const cardTemplate = document.querySelector(
    parameters.gridCardTemplateSelector
  ).content;
  const cardElement = cardTemplate.querySelector(
    parameters.cardElementSelector
  );
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(parameters.imageCardSelector);

  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(parameters.newCardSelector).textContent =
    titleCardValue;

  newCard
    .querySelector(parameters.buttonLikeSelector)
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle(parameters.buttonLikeActiveClass);
    });

  newCard
    .querySelector(parameters.buttonDeleteCardSelector)
    .addEventListener("click", function (evt) {
      newCard.remove();
    });

  newCard
    .querySelector(parameters.imageCardSelector)
    .addEventListener("click", function (evt) {
      openPopUp(popUpPicCard);
      popUpPicImg.src = imgSrc;
      popUpPicImg.alt = titleCardValue;
      popUpPicCaption.textContent = titleCardValue;
    });
  return newCard;
}

function renderCard(newCard) {
  document.querySelector(parameters.cardElementsSelector).prepend(newCard);
}

export const enableCards = (params) => {
  parameters = params;
  initialCards.forEach(function (element) {
    renderCard(createCard(element.link, element.name));
  });

  const popUpAddCard = document.querySelector(parameters.popUpAddCardSelector);
  const titleCardInput = document.querySelector(
    parameters.titleCardInputSelector
  );
  const imageCardInput = document.querySelector(
    parameters.imageCardInputSelector
  );
  const popUpForm = document.querySelector(parameters.popUpFormSelector);

  document
    .querySelector(parameters.profileAddButtonSelector)
    .addEventListener("click", (evt) => {
      openPopUp(popUpAddCard);
    });

  popUpForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderCard(
      createCard(imageCardInput.value, titleCardInput.value)
    );
    closePopUp(popUpAddCard);
    popUpForm.reset();
  });
};
