import { openPopUp, closePopUp } from "/src/components/utils";
import { getData, deleteData, createData, putData } from "./api";
import { setUserInfo } from "./modal";

export let cards;
export let user = {};
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
  likesArray,
  userProfile
) {
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(parameters.imageCardSelector);
  const likes = newCard.querySelector(parameters.likeSelector);

  likes.textContent = likesArray.length;
  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(parameters.newCardSelector).textContent =
    titleCardValue;

  const buttonLike = newCard.querySelector(parameters.buttonLikeSelector);

  likesArray.forEach(({ _id }) => {
    if (_id === userProfile._id) {
      buttonLike.classList.add(parameters.buttonLikeActiveClass);
    }
  });

  buttonLike.addEventListener("click", function (evt) {
    if (!buttonLike.classList.contains(parameters.buttonLikeActiveClass)) {
      putData(`${parameters.urlLike}/${cardId}`)
        .then((data) => {
          evt.target.classList.toggle(parameters.buttonLikeActiveClass);
          likes.textContent = data.likes.length;
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
        });
    } else {
      deleteData(`${parameters.urlLike}/${cardId}`)
        .then((data) => {
          evt.target.classList.toggle(parameters.buttonLikeActiveClass);
          likes.textContent = data.likes.length;
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
        });
    }
  });
  if (userProfile._id === ownerId) {
    newCard
      .querySelector(parameters.buttonDeleteCardSelector)
      .addEventListener("click", function (evt) {
        deleteData(`${parameters.urlCards}/${cardId}`)
          .then((data) => {
            newCard.remove();
          })
          .catch((res) => {
            console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
          });
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

export function renderCard(newCard, cardElements) {
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

  const userName = document.querySelector(parameters.inputNameSelector);
  const userDescription = document.querySelector(
    parameters.userDescriptionSelector
  );
  const profileAvatar = document.querySelector(
    parameters.profileAvatarSelector
  );

  const allPromise = Promise.all([
    getData(parameters.userUrl),
    getData(parameters.urlCards),
  ]);
  allPromise
    .then(([userData, cardsData]) => {
      user = userData;
      setUserInfo(userName, userDescription, profileAvatar, userData);

      const userProfile = {
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
        cohort: userData.cohort,
      };
      cardsData.forEach(function (element) {
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
            element.likes,
            userProfile
          ),
          cardElements
        );
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`); // "Что-то пошло не так: ..."
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
    })
      .then((data) => {
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
            data.likes,
            user
          ),
          cardElements
        );
        closePopUp(popUpAddCard);
        popUpForm.reset();
        buttonAddCard.disabled = true;
        buttonAddCard.classList.add(parameters.inactiveButtonClass);
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
      })
      .finally(() => {
        buttonAddCard.textContent = "Создать";
      });
  });
};
