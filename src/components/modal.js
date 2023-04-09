let parameters = {};
import { openPopUp, closePopUp } from "/src/components/utils";
import { updateData, getData } from "./api";
export let userId = "";

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

function addListenerEditAvatar(button, sectionUpdateAvatarPopup) {
  button.addEventListener("click", () => {
    openPopUp(sectionUpdateAvatarPopup);
  });
}

function addListenerEditProfile(
  userName,
  inputName,
  userDescription,
  inputDescription,
  popUpEditCard,
  buttonSaveProfile
) {
  document.forms.editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    buttonSaveProfile.textContent = "Сохранение...";
    const userData = {
      name: inputName.value,
      about: inputDescription.value,
    };
    updateData(parameters.userUrl, userData).then((res) => {
      userName.textContent = res.name;
      userDescription.textContent = res.about;
      closePopUp(popUpEditCard);
      buttonSaveProfile.textContent = "Сохранить";
    });
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
    userId = res._id;
  });
}

function addListenerEditAvatarForm(
  inputUrlAvatar,
  profileAvatar,
  editAvatarButton,
  sectionUpdateAvatarPopup
) {
  document.forms.updateAvatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    editAvatarButton.textContent = "Сохранение...";

    const userData = {
      avatar: inputUrlAvatar.value,
    };
    updateData(parameters.userUpdateAvatarUrl, userData).then((res) => {
      profileAvatar.src = res.avatar;
      closePopUp(sectionUpdateAvatarPopup);
      editAvatarButton.textContent = "Сохранить";
      document.forms.updateAvatarForm.reset();
      editAvatarButton.disabled = true;
      editAvatarButton.classList.add(parameters.inactiveButtonClass);
    });
  });
}

export const enableModals = (params) => {
  parameters = params;

  const editButton = document.querySelector(parameters.editButtonSelector);
  const popUpEditCard = document.querySelector(parameters.userNameSelector);
  const sectionUpdateAvatarPopup = document.querySelector(
    parameters.sectionUpdateAvatarPopupSelector
  );
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
  const buttonEditAvatar = document.querySelector(
    parameters.buttonEditAvatarSelector
  );

  addListenerEditAvatar(buttonEditAvatar, sectionUpdateAvatarPopup);

  const inputAvatarUrl = document.querySelector(
    parameters.inputAvatarUrlSelector
  );
  const editAvatarButton = document.querySelector(
    parameters.editAvatarButtonSelector
  );

  addListenerEditAvatarForm(
    inputAvatarUrl,
    profileAvatar,
    editAvatarButton,
    sectionUpdateAvatarPopup
  );

  getUserInfo(userName, userDescription, profileAvatar);
  const buttonSaveProfile = document.querySelector(
    parameters.buttonSaveProfileSelector
  );
  addListenerEditProfile(
    userName,
    inputName,
    userDescription,
    inputDescription,
    popUpEditCard,
    buttonSaveProfile
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
