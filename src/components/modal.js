let parameters = {};
import { openPopUp, closePopUp } from "/src/components/utils";
import { updateData } from "./api";

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
    updateData(parameters.userUrl, userData)
      .then((res) => {
        userName.textContent = res.name;
        userDescription.textContent = res.about;
        closePopUp(popUpEditCard);
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
      })
      .finally(() => {
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

export function setUserInfo(
  userName,
  userDescription,
  profileAvatar,
  userData
) {
  userName.textContent = userData.name;
  userDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;
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
    updateData(parameters.userUpdateAvatarUrl, userData)
      .then((res) => {
        profileAvatar.src = res.avatar;
        closePopUp(sectionUpdateAvatarPopup);
        document.forms.updateAvatarForm.reset();
        editAvatarButton.disabled = true;
        editAvatarButton.classList.add(parameters.inactiveButtonClass);
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        editAvatarButton.textContent = "Сохранить";
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
