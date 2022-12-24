const editButton = document.querySelector(".profile__edit-button");
const userName = document.querySelector("h1");
const inputName = document.querySelector("#name");
const popUpEditCard = document.querySelector("#section-popup-edit-profile");
const userDescription = document.querySelector(".profile__user-description");
const inputDescription = document.querySelector("#description");
const titleCard = document.querySelector(".photo-grid__card-name");
const imageCard = document.querySelector(".photo-grid__image");
const titleCardInput = document.querySelector("#card-title");
const imageCardInput = document.querySelector("#card-url");
const addButton = document.querySelector(".profile__add-button");
const popUpAddCard = document.querySelector("#section-popup-add-card");
const cardsContainer = document.querySelector(".photo-grid__cards");
const cardTemplate = document.querySelector("#grid-card-template").content;
  const popUpPicImg = document.querySelector("#popup-pic-img");
  const popUpPicCaption = document.querySelector("#popup-pic-caption");

const buttonClosePopUpEditCard = document.querySelector("#close_pop-up_edit-profile");
const buttonClosePopUpAddCard = document.querySelector("#close_pop-up_add-card");
const buttonClosePopUpPic = document.querySelector("#close_pop-up_pic");

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


// Общие функции для открытия и закрытия поп-апа
function openPopUp(idElement) {
  document.querySelector("#" + idElement).classList.add("popup_opened");
}


function closePopUp(idElement) {
  document.querySelector('#'+idElement).classList.remove("popup_opened");
}

// const clickExit = (evt) => {
//   closePopUp(evt.target.closest(".popup"));
// };

// const exit = Array.from(document.querySelectorAll(".popup__button-close")).forEach(
//   (element) => {
//     element.addEventListener("click", clickExit);
//   }
// );

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

buttonClosePopUpEditCard.addEventListener("click", (evt) => {
  closePopUp("section-popup-edit-profile");
});



// Добавить карточку
function addCard(imgSrc, titleCardValue) {
  const cardElement = cardTemplate
    .querySelector(".photo-grid__card")
    .cloneNode(true);
  cardElement.querySelector(".photo-grid__image").src = imgSrc;
  cardElement.querySelector(".photo-grid__card-name").textContent =
    titleCardValue;

  // Likes
  cardElement
    .querySelector(".button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button-like_active");
    });

  // Delete card
  cardElement
    .querySelector(".button-delete-card")
    .addEventListener("click", function (evt) {
      cardElement.remove();
    });

   buttonClosePopUpPic.addEventListener(
    "click", (evt) => {
      closePopUp("section-popup-pic");
    });

  cardElement
    .querySelector(".photo-grid__image")
    .addEventListener("click", function (evt) {
      openPopUp("section-popup-pic");

      popUpPicImg.src = imgSrc.src;
      popUpPicCaption.textContent = titleCardValue;
    });

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function (element) {
  addCard(element.link, element.name);
});

addButton.addEventListener("click", (evt) => {
  // popUpAddCard.classList.add("popup_opened");
  openPopUp("section-popup-add-card");
});

// function closePopUpAddCard() {
//   // popUpAddCard.classList.remove("popup_opened");
//   closePopUp();
// }

buttonClosePopUpAddCard.addEventListener(
  "click", (evt) => {
  closePopUp("section-popup-add-card");
  });
// console.log("pop up pic closed");

document
  .querySelector("#popup__form_add-card")
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    closePopUp("section-popup-add-card");
    addCard(imageCardInput.value, titleCardInput.value);
  });
