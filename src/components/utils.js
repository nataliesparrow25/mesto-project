let parameters = {};

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopUp(openedPopup);
  }
}

export function closePopUp(popup) {
  popup.classList.remove(parameters.popupOpenedClass);
  document.removeEventListener("keydown", closeByEscape);
}

export function openPopUp(popup) {
  popup.classList.add(parameters.popupOpenedClass);
  document.addEventListener("keydown", closeByEscape);
}

export const enableUtils = (params) => {
  parameters = params;
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}
