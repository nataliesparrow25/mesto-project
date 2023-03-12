let parameters = {};
import { openPopUp } from "/src/components/utils";

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

export const enableModals = (params) => {
  parameters = params;
  const editButton = document.querySelector(parameters.editButtonSelector);
  const popUpEditCard = document.querySelector(parameters.userNameSelector);
  const userName = document.querySelector(parameters.inputNameSelector);
  const inputName = document.querySelector(parameters.nameSelector);
  const inputDescription = document.querySelector(
    parameters.inputDescriptionSelector
  );
  const userDescription = document.querySelector(
    parameters.userDescriptionSelector
  );

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
