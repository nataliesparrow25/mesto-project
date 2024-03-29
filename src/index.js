import "/src/index.css";
import { enableApi } from "./components/api";
import { enableValidation } from "/src/components/validate";
import { enableCards } from "/src/components/card";
import { enableModals } from "/src/components/modal";
import { enableUtils } from "/src/components/utils";

enableApi({
  baseUrl: "https://nomoreparties.co/v1",
  cohort: "plus-cohort-22",
  authToken: "4ea1ac11-b9d4-4569-861a-158722f0e68d",
});

enableUtils({
  popupOpenedClass: "popup_opened",
});

enableModals({
  editButtonSelector: ".profile__edit-button",
  popUpEditCardSelector: ".profile__edit-button",
  profileAvatarSelector: ".profile__avatar",
  userNameSelector: "#section-popup-edit-profile",
  sectionUpdateAvatarPopupSelector: "#section-update-avatar-popup",
  inputNameSelector: ".profile__user-name",
  inputDescriptionSelector: "#description",
  userDescriptionSelector: ".profile__user-description",
  formEditProfileSelector: "#popup__form_edit-profile",
  buttonCloseListSelector: ".popup__button-close",
  nameSelector: "#name",
  popupSelector: ".popup",
  userUrl: "users/me",
  userUpdateAvatarUrl: "users/me/avatar",
  buttonEditAvatarSelector: ".profile__avatar-edit-button",
  editAvatarButtonSelector: '#button-update-avatar',
  inputAvatarUrlSelector: "#avatar-url",
  inactiveButtonClass: "popup__button_inactive",
  buttonSaveProfileSelector: '#button-save-name',


});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "name-error_active",
});

enableCards({
  popUpPicCaptionSelector: "#popup-pic-caption",
  popUpPicImgSelector: "#popup-pic-img",
  gridCardTemplateSelector: "#grid-card-template",
  cardElementSelector: ".photo-grid__card",
  imageCardSelector: ".photo-grid__image",
  newCardSelector: ".photo-grid__card-name",
  buttonLikeSelector: ".button-like",
  buttonLikeActiveClass: "button-like_active",
  buttonDeleteCardSelector: ".button-delete-card",
  popUpPicImgSelector: "#section-popup-pic",
  cardElementsSelector: ".photo-grid__cards",
  popUpAddCardSelector: "#section-popup-add-card",
  titleCardInputSelector: "#card-title",
  imageCardInputSelector: "#card-url",
  popUpFormSelector: "#popup__form_add-card",
  profileAddButtonSelector: ".profile__add-button",
  buttonAddCardSelector: "#button-add-card",
  inactiveButtonClass: "popup__button_inactive",
  urlCards: "cards",
  photoGridCardInfoSelector: ".photo-grid__card-info",
  likeSelector: '.photo-grid__like-counter',
  urlLike: 'cards/likes',

  userDescriptionSelector: ".profile__user-description",
  inputNameSelector: ".profile__user-name",
  profileAvatarSelector: ".profile__avatar",
  userUrl: "users/me",

});
