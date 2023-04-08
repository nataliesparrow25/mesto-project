let parameters = {};
import { openPopUp, closePopUp } from "/src/components/utils";
import { updateData, getData } from "./api";

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
  inputDescription,
  popUpEditCard
) {
  document.forms.editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const userData = {
      name: inputName.value,
      about: inputDescription.value,
    };
    updateData(parameters.userUrl, userData).then((res) => {
      userName.textContent = res.name;
      userDescription.textContent = res.about;
    });
    closePopUp(popUpEditCard);
  });
}

function addEventListenerButtonClose(buttonCloseList) {
  buttonCloseList.forEach((btn) => {
    const popup = btn.closest(parameters.popupSelector);
    btn.addEventListener("click", () => closePopUp(popup));
  });
}

function getUserInfo(userName, userDescription, profileAvatar) {
  getData(parameters.userUrl).then((res) => {
    userName.textContent = res.name;
    userDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
  });
}

export const enableModals = (params) => {
  parameters = params;

  const editButton = document.querySelector(parameters.editButtonSelector);
  const popUpEditCard = document.querySelector(parameters.userNameSelector);
  const userName = document.querySelector(parameters.inputNameSelector);
  const inputName = document.querySelector(parameters.nameSelector);
  const profileAvatar = document.querySelector(
    parameters.profileAvatarSelector
  );
  const buttonCloseList = document.querySelectorAll(
    parameters.buttonCloseListSelector
  );

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

  getUserInfo(userName, userDescription, profileAvatar);

  addListenerEditProfile(
    userName,
    inputName,
    userDescription,
    inputDescription,
    popUpEditCard
  );

  const popUps = document.querySelectorAll(parameters.popupSelector);
  popUps.forEach((popUpElement) => {
    popUpElement.addEventListener("mousedown", (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopUp(popUpElement);
      }
    });
  });
};
