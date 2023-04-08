import { openPopUp, closePopUp } from "/src/components/utils";






let parameters = {};

function createCard(
  imgSrc,
  titleCardValue,
  popUpPicCaption,
  popUpPicCard,
  popUpPicImg,
  cardElement
) {
  const newCard = cardElement.cloneNode(true);
  const imageCard = newCard.querySelector(parameters.imageCardSelector);

  imageCard.src = imgSrc;
  imageCard.alt = titleCardValue;
  newCard.querySelector(parameters.newCardSelector).textContent =
    titleCardValue;

  newCard
    .querySelector(parameters.buttonLikeSelector)
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle(parameters.buttonLikeActiveClass);
    });

  newCard
    .querySelector(parameters.buttonDeleteCardSelector)
    .addEventListener("click", function (evt) {
      newCard.remove();
    });

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

  fetch('https://nomoreparties.co/v1/plus-cohort-22/cards', {
  headers: {
    authorization: '4ea1ac11-b9d4-4569-861a-158722f0e68d'
  }
  })
    .then((res) => {
    return res.json(); 
  })
  .then((res) => {
        res.forEach(function (element) {
    renderCard(
      createCard(
        element.link,
        element.name,
        popUpPicCaption,
        popUpPicCard,
        popUpPicImg,
        cardElement
      ),
      cardElements
    );
    });

  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  });


    
  

   
  


  const popUpAddCard = document.querySelector(parameters.popUpAddCardSelector);
  const titleCardInput = document.querySelector(
    parameters.titleCardInputSelector
  );
  const imageCardInput = document.querySelector(
    parameters.imageCardInputSelector
  );
  const popUpForm = document.querySelector(parameters.popUpFormSelector);
  const buttonAddCard = document.querySelector(parameters.buttonAddCardSelector); 

  document
    .querySelector(parameters.profileAddButtonSelector)
    .addEventListener("click", (evt) => {
      openPopUp(popUpAddCard);
    });

  popUpForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderCard(
      createCard(
        imageCardInput.value,
        titleCardInput.value,
        popUpPicCaption,
        popUpPicCard,
        popUpPicImg,
        cardElement
      ),
      cardElements
    );
    closePopUp(popUpAddCard);
    popUpForm.reset();
    buttonAddCard.disabled = true;
    buttonAddCard.classList.add(parameters.inactiveButtonClass);
  });
};
