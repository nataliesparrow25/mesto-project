let parameters = {};
import { openPopUp, closePopUp } from "/src/components/utils";

function addListenerButton(
  button,
  popUpEditCard,
  userName,
  inputName,
  inputDescription,
  userDescription
) {
  button.addEventListener("click", () => {
    openPopUp(popUpEditCard);
    inputName.value = userName.textContent;
    inputDescription.value = userDescription.textContent;
  });
}

function addListenerEditProfile(
  userName,
  inputName,
  userDescription,
  inputDescription
) {
  document
    .querySelector(parameters.formEditProfileSelector)
    .addEventListener("submit", (evt) => {
      evt.preventDefault();
      userName.textContent = inputName.value;
      userDescription.textContent = inputDescription.value;
    });
}

function addEventListenerButtonClose(buttonCloseList) {
  buttonCloseList.forEach((btn) => {
  const popup = btn.closest(parameters.popupSelector);
  btn.addEventListener("click", () => closePopUp(popup));
});
}

export const enableModals = (params) => {
  parameters = params;
  const editButton = document.querySelector(parameters.editButtonSelector);
  const popUpEditCard = document.querySelector(parameters.userNameSelector);
  const userName = document.querySelector(parameters.inputNameSelector);
  const inputName = document.querySelector(parameters.nameSelector);
  const buttonCloseList = document.querySelectorAll(parameters.buttonCloseListSelector);

  const inputDescription = document.querySelector(
    parameters.inputDescriptionSelector
  );
  const userDescription = document.querySelector(
    parameters.userDescriptionSelector
  );

  addEventListenerButtonClose(buttonCloseList);

  addListenerButton(
    editButton,
    popUpEditCard,
    userName,
    inputName,
    inputDescription,
    userDescription
  );
  addListenerEditProfile(
    userName,
    inputName,
    userDescription,
    inputDescription
  );
};
