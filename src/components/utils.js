let parameters = {};

export function closePopUp(popup) {
  popup.classList.remove(parameters.popupOpenedClass);
    window.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp(popup);
    }
  });
}

export function openPopUp(popup) {
  popup.classList.add(parameters.popupOpenedClass);
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp(popup);
    }
  });
}

export const enableUtils = (params) => {
    parameters = params;
}
