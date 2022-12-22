let editButton = document.querySelector(".profile__edit-button");
let userName = document.querySelector("h1");
let inputName = document.getElementById("name");
let popUp = document.getElementById("section-popup");
let buttonClosePopUp = document.querySelector(".popup__button-close");
let userDescription = document.querySelector(".profile__user-description");
let inputDescription = document.getElementById("description");

function closePopUp() {
  popUp.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => {
  popUp.classList.add("popup_opened");
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
});

document
  .querySelector("#popup__admin_edit-profile")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userDescription.textContent = inputDescription.value;
    closePopUp();
  });

buttonClosePopUp.addEventListener("click", closePopUp);

let titleCard = document.querySelector(".photo-grid__card-name");
let imageCard = document.getElementById(".photo-grid__image");
let titleCardInput = document.querySelector("#card-title");
let imageCardInput = document.querySelector("#card-url");
let addButton = document.querySelector(".profile__add-button");
let popUpAddCard = document.querySelector("#section-popup-add-card");
let buttonClosePopUpAddCard = document.querySelector("#close_pop-up_add-card");

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

function addCard(imgSrc, titleCardValue) {
  let cardsContainer = document.querySelector(".photo-grid__cards");
  const cardTemplate = document.querySelector("#grid-card-template").content;
  const cardElement = cardTemplate
    .querySelector(".photo-grid__card")
    .cloneNode(true);
  cardElement.querySelector(".photo-grid__image").src = imgSrc;
  cardElement.querySelector(".photo-grid__card-name").textContent =
    titleCardValue;
  
  cardElement
    .querySelector(".button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button-like_active");
    });
  
  cardElement
    .querySelector(".button-delete-card")
    .addEventListener("click", function (evt) {
      cardElement.remove();
    });

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function (element) {
  addCard(element.link, element.name);
});

addButton.addEventListener("click", () => {
  popUpAddCard.classList.add("popup_opened");
});

function closePopUpAddCard() {
  popUpAddCard.classList.remove("popup_opened");
}

buttonClosePopUpAddCard.addEventListener("click", closePopUpAddCard);

document
  .querySelector("#popup__admin_add-card")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    closePopUpAddCard();
    addCard(imageCardInput.value, titleCardInput.value);
  });
