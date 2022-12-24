const editButton = document.querySelector(".profile__edit-button");
const userName = document.querySelector(".profile__user-name");
const inputName = document.querySelector("#name");
const popUpEditCard = document.querySelector("#section-popup-edit-profile");
const userDescription = document.querySelector(".profile__user-description");
const inputDescription = document.querySelector("#description");
// const titleCard = document.querySelector(".photo-grid__card-name");
const titleCardInput = document.querySelector("#card-title");
const imageCardInput = document.querySelector("#card-url");
const addButton = document.querySelector(".profile__add-button");
const popUpAddCard = document.querySelector("#section-popup-add-card");
const cardsContainer = document.querySelector(".photo-grid__cards");
const cardTemplate = document.querySelector("#grid-card-template").content;
const cardElement = cardTemplate.querySelector(".photo-grid__card");
const popUpPicImg = document.querySelector("#popup-pic-img");
const popUpPicCaption = document.querySelector("#popup-pic-caption");
const buttonClosePopUpEditCard = document.querySelector(
  "#close_pop-up_edit-profile"
);
const buttonClosePopUpAddCard = document.querySelector(
  "#close_pop-up_add-card"
);
const buttonClosePopUpPic = document.querySelector("#close_pop-up_pic");


// Общие функции для открытия и закрытия поп-апа
function openPopUp(idElement) {
  document.querySelector("#" + idElement).classList.add("popup_opened");
}

function closePopUp(idElement) {
  document.querySelector("#" + idElement).classList.remove("popup_opened");
}

buttonClosePopUpEditCard.addEventListener("click", (evt) => {
  closePopUp("section-popup-edit-profile");
});

// edit profile button
editButton.addEventListener("click", () => {
  openPopUp("section-popup-edit-profile");
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
});

document
  .querySelector("#popup__form_edit-profile")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;
    closePopUp("section-popup-edit-profile");
  });

// Добавить карточку
function createCard(imgSrc, titleCardValue) {
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(".photo-grid__image");

  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(".photo-grid__card-name").textContent = titleCardValue;

  // Likes
  newCard
    .querySelector(".button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button-like_active");
    });

  // Delete card
  newCard
    .querySelector(".button-delete-card")
    .addEventListener("click", function (evt) {
      newCard.remove();
    });

  //Popup pic

  newCard
    .querySelector(".photo-grid__image")
    .addEventListener("click", function (evt) {
      openPopUp("section-popup-pic");
      popUpPicImg.src = imgSrc;
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

buttonClosePopUpPic.addEventListener("click", (evt) => {
  closePopUp("section-popup-pic");
});

addButton.addEventListener("click", (evt) => {
  openPopUp("section-popup-add-card");
});

function resetInputValueAddCard() {
  titleCardInput.value = "";
  imageCardInput.value = "";
}

buttonClosePopUpAddCard.addEventListener("click", (evt) => {
  closePopUp("section-popup-add-card");
  resetInputValueAddCard();
});

document
  .querySelector("#popup__form_add-card")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    closePopUp("section-popup-add-card");
    renderCard(createCard(imageCardInput.value, titleCardInput.value));
    resetInputValueAddCard();
  });
