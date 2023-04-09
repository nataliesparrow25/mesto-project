import { openPopUp, closePopUp } from "/src/components/utils";
import { getData, deleteData, createData, putData } from "./api";
import { userId } from "./modal";

let parameters = {};

function createCard(
  imgSrc,
  titleCardValue,
  cardId,
  ownerId,
  popUpPicCaption,
  popUpPicCard,
  popUpPicImg,
  cardElement,
  countLikes,
) {
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(parameters.imageCardSelector);
  const likes = newCard.querySelector(parameters.likeSelector);
  
  likes.textContent = countLikes;
  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(parameters.newCardSelector).textContent =
    titleCardValue;

  const buttonLike = newCard.querySelector(parameters.buttonLikeSelector);
  
    buttonLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle(parameters.buttonLikeActiveClass);
      if (buttonLike.classList.contains(parameters.buttonLikeActiveClass)) {
        putData(`${parameters.urlLike}/${cardId}`).then((data) => {
          likes.textContent = data.likes.length;
        });
      } else {
        deleteData(`${parameters.urlLike}/${cardId}`).then((data) => {
          likes.textContent = data.likes.length;
        });
      }
    });
  if (userId === ownerId) {
    newCard
      .querySelector(parameters.buttonDeleteCardSelector)
      .addEventListener("click", function (evt) {
        deleteData(`${parameters.urlCards}/${cardId}`);
        newCard.remove();
      });
  } else {
    const photoGridCardInfonewCard = newCard.querySelector(
      parameters.photoGridCardInfoSelector
    );
    photoGridCardInfonewCard.removeChild(
      photoGridCardInfonewCard.lastElementChild
    );
  }

  imageCard.addEventListener("click", function (evt) {
    openPopUp(popUpPicCard);
    popUpPicImg.src = imgSrc;
    popUpPicImg.alt = titleCardValue;
    popUpPicCaption.textContent = titleCardValue;
  });
  return newCard;
}

function renderCard(newCard, cardElements) {
  cardElements.prepend(newCard);
}

export const enableCards = (params) => {
  parameters = params;
  const popUpPicCaption = document.querySelector(
    parameters.popUpPicCaptionSelector
  );
  const popUpPicCard = document.querySelector(
    parameters.sectionPopUpPicSelector
  );
  const popUpPicImg = document.querySelector(parameters.popUpPicImgSelector);
  const cardTemplate = document.querySelector(
    parameters.gridCardTemplateSelector
  ).content;
  const cardElement = cardTemplate.querySelector(
    parameters.cardElementSelector
  );

  const cardElements = document.querySelector(parameters.cardElementsSelector);
  getData(parameters.urlCards).then((data) => {
    data.forEach(function (element) {
      renderCard(
        createCard(
          element.link,
          element.name,
          element._id,
          element.owner._id,
          popUpPicCaption,
          popUpPicCard,
          popUpPicImg,
          cardElement,
          element.likes.length
        ),
        cardElements
      );
    });
  });

  const popUpAddCard = document.querySelector(parameters.popUpAddCardSelector);
  const titleCardInput = document.querySelector(
    parameters.titleCardInputSelector
  );
  const imageCardInput = document.querySelector(
    parameters.imageCardInputSelector
  );
  const popUpForm = document.querySelector(parameters.popUpFormSelector);
  const buttonAddCard = document.querySelector(
    parameters.buttonAddCardSelector
  );

  document
    .querySelector(parameters.profileAddButtonSelector)
    .addEventListener("click", (evt) => {
      openPopUp(popUpAddCard);
    });

  popUpForm.addEventListener("submit", (evt) => {
    buttonAddCard.textContent = "Сохранение...";

    evt.preventDefault();

    createData(parameters.urlCards, {
      name: titleCardInput.value,
      link: imageCardInput.value,
    }).then((data) => {
      renderCard(
        createCard(
          data.link,
          data.name,
          data._id,
          data.owner._id,
          popUpPicCaption,
          popUpPicCard,
          popUpPicImg,
          cardElement,
          data.likes.length
        ),
        cardElements
      );
      closePopUp(popUpAddCard);
      popUpForm.reset();
      buttonAddCard.textContent = "Создать";

      buttonAddCard.disabled = true;
      buttonAddCard.classList.add(parameters.inactiveButtonClass);
    });
  });
};
