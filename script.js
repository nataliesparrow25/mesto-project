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

const buttonClosePopUpEditCard = document.querySelector(
  "#close_pop-up_edit-profile"
);
const buttonClosePopUpAddCard = document.querySelector(
  "#close_pop-up_add-card"
);
const buttonClosePopUpPic = document.querySelector("#close_pop-up_pic");


function openPopUp(popup) {
  popup.classList.add("popup_opened");
}

function closePopUp(popup) {
  popup.classList.remove("popup_opened");
}

buttonClosePopUpEditCard.addEventListener("click", (evt) => {
  closePopUp(popUpEditCard);
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
    closePopUp(popUpEditCard);
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

buttonClosePopUpPic.addEventListener("click", (evt) => {
  closePopUp(popUpPicCard);
});

addButton.addEventListener("click", (evt) => {
  openPopUp(popUpAddCard);
});

function resetInputValueAddCard() {
  titleCardInput.value = "";
  imageCardInput.value = "";
}

buttonClosePopUpAddCard.addEventListener("click", (evt) => {
  closePopUp(popUpAddCard);
  resetInputValueAddCard();
});

document
  .querySelector("#popup__form_add-card")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    closePopUp(popUpAddCard);
    renderCard(createCard(imageCardInput.value, titleCardInput.value));
    resetInputValueAddCard();
  });
