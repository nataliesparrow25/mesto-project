const editButton = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__user-name");
const inputName = document.querySelector("#name");
const userDescription = document.querySelector(".profile__user-description");
const inputDescription = document.querySelector("#description");
const titleCardInput = document.querySelector("#card-title");
const imageCardInput = document.querySelector("#card-url");
const addButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".photo-grid__cards");
const cardTemplate = document.querySelector("#grid-card-template").content;
const cardElement = cardTemplate.querySelector(".photo-grid__card");
const popUpPicCaption = document.querySelector("#popup-pic-caption");
const popUpPicImg = document.querySelector("#popup-pic-img");

const popUpEditCard = document.querySelector("#section-popup-edit-profile");
const popUpAddCard = document.querySelector("#section-popup-add-card");
const popUpPicCard = document.querySelector("#section-popup-pic");
const buttonCloseList = document.querySelectorAll(".popup__button-close");
const popUpForm = document.querySelector("#popup__form_add-card");


function openPopUp(popup) {
  popup.classList.add("popup_opened");
}

function closePopUp(popup) {
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
