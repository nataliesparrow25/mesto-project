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

document.querySelector(".popup__admin").addEventListener("submit", (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  closePopUp();
});

buttonClosePopUp.addEventListener("click", closePopUp);
