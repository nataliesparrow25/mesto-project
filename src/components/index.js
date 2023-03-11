import { enableValidation } from "./validate";

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'name-error_active',
  popupSelector: '.popup',
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
  sectionPopUpPicSelector: "#section-popup-pic",
  buttonLikeActiveClass: "buttonLikeActiveClass",
  cardElementsSelector: ".photo-grid__cards",
  popUpAddCardSelector: "#section-popup-add-card",
  titleCardInputSelector: "#card-title",
  imageCardInputSelector: "#card-url",
  popUpFormSelector: "#popup__form_add-card",
  profileAddButtonSelector: '.profile__add-button',
});
