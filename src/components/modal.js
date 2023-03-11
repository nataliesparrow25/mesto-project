export function closePopUp(popup) {
  if (popup.code === 'Escape') {
  popup.classList.remove("popup_opened");
  }

  popup.classList.remove("popup_opened");
}


export function openPopUp(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener('keydown', closePopUp)
  window.addEventListener('keydown', (evt) => {
    console.log('Esc', evt.key);
     if (evt.key === 'Escape') {
    closePopUp(popup);
  }
  });
}