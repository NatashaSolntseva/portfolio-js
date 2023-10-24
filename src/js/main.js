const progressData = [
  { text: "Photoshop", percent: 73 },
  { text: "Illustrator", percent: 73 },
  { text: "Figma", percent: 94 },
  { text: "HTML/ CSS", percent: 88 },
  { text: "JQuery", percent: 88 },
];

const cardData = [
  {
    src: "img/card1.png",
    srcset: "img/card1.png, img/card1@2x.png 2x",
    srcsetWp: "img/card1@2x.webp 2x",
    caption: "Agency Template",
  },
  {
    src: "img/card2.png",
    srcset: "img/card2.png, img/card2@2x.png 2x",
    srcsetWp: "img/card2@2x.webp 2x",
    caption: "Lifestyle Blog Template",
  },
  {
    src: "img/card3.png",
    srcset: "img/card3.png, img/card3@2x.png 2x",
    srcsetWp: "img/card3@2x.webp 2x",
    caption: "Saas Landing Page",
  },
  {
    src: "img/card4.png",
    srcset: "img/card4.png, img/card4@2x.png 2x",
    srcsetWp: "img/card4@2x.webp 2x",
    caption: "Lucas Portfolio Template",
  },
  {
    src: "img/card5.png",
    srcset: "img/card5.png, img/card5@2x.png 2x",
    srcsetWp: "img/card5@2x.webp 2x",
    caption: "Serene Product Template",
  },
  {
    src: "img/card6.png",
    srcset: "img/card6.png, img/card6@2x.png 2x",
    srcsetWp: "img/card6@2x.webp 2x",
    caption: "Sajna eCommerce Template",
  },
  // {
  //   src: "img/card7.jpg",
  //   srcset: "img/card7.jpg, img/card7.jpg 2x",
  //   srcsetWp: "img/card7.webp, img/card7.webp 2x",
  //   caption: "Nice Picture",
  // },
  // {
  //   src: "img/card8.jpeg",
  //   srcset: "img/card8.jpeg, img/card8.jpeg 2x",
  //   srcsetWp: "img/card8.webp, img/card8.webp 2x",
  //   caption: "Nice Picture",
  // },
  // {
  //   src: "img/card9.jpg",
  //   srcset: "img/card9.jpg, img/card9.jpg 2x",
  //   srcsetWp: "img/card9.webp, img/card9.webp 2x",
  //   caption: "Nice Picture",
  // },
];

// Function for creating a progress bar
function createProgressBar(data) {
  // Clone progress bar template
  const progressBarTemplate = document.querySelector("#progress-bar-template");
  const progressBarClone = document.importNode(
    progressBarTemplate.content,
    true
  );
  const progressBar = progressBarClone.querySelector(".progress-bar");
  const fill = progressBar.querySelector(".progress-bar__fill");
  const label = progressBar.querySelector(".progress-bar__label");

  // Set fill width and label text
  fill.style.width = `${data.percent}%`;
  label.textContent = data.text;
  return progressBar;
}

// Function for creating a card
function createCard(data, index) {
  // Clone card template
  const cardTemplate = document.querySelector("#card-template");
  const cardClone = document.importNode(cardTemplate.content, true);

  const card = cardClone.querySelector(".card");
  const sourceWebP = cardClone.querySelector("source");
  const img = cardClone.querySelector("img");
  const caption = cardClone.querySelector(".card__caption");

  // Set card attributes and content
  sourceWebP.setAttribute("srcset", data.srcsetWp);
  img.setAttribute("src", data.src);
  img.setAttribute("srcset", data.srcset);
  img.setAttribute("alt", data.caption);
  caption.textContent = data.caption;

  card.classList.add(`card${index + 1}`);
  return card;
}

// Function for opening the modal window
function openPopUp(imageSrc, imageSrcSet, imageSrcSetWebP, caption) {
  const body = document.body;
  const popUp = document.querySelector(".pop-up");
  const popUpImage = popUp.querySelector(".pop-up__img");
  const popUpImageSourceWebP = popUp.querySelector(".pop-up__source");
  const popUpCaption = document.querySelector(".pop-up__caption");

  // Set modal window content
  popUpImage.src = imageSrc;
  popUpImage.alt = caption;
  popUpImage.srcset = imageSrcSet;
  popUpImageSourceWebP.srcset = imageSrcSetWebP;
  popUpCaption.textContent = caption;

  popUp.style.visibility = "visible";
  popUp.style.opacity = "1";
  body.classList.add("no-scroll");
}

// Function for closing the modal window
function closePopUp() {
  const body = document.body;
  const popUp = document.querySelector(".pop-up");

  popUp.style.visibility = "hidden";
  popUp.style.opacity = "0";
  body.classList.remove("no-scroll");
}

// Load content after the page is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  // Create progress bars
  const progressBarContainer = document.querySelector(
    ".skills__progress-bar-container"
  );

  progressData.forEach((data) => {
    const progressBar = createProgressBar(data);
    progressBarContainer.appendChild(progressBar);
  });

  // Create cards
  const cardContainer = document.querySelector(".cards-container");

  cardData.forEach((data, index) => {
    const card = createCard(data, index);
    cardContainer.appendChild(card);
  });

  // Add event listeners to cards
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const image = card.querySelector("img");
    const source = card.querySelector("source");
    const caption = card.querySelector(".card__caption").textContent;

    image.addEventListener("click", () => {
      openPopUp(image.src, image.srcset, source.srcset, caption);
    });
  });

  // Add event listener to close button
  const popUpCloseButton = document.querySelector(".pop-up__btn-close");

  popUpCloseButton.addEventListener("click", closePopUp);

  // Add event listener to Esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopUp();
    }
  });

  // Add event listener to the modal overlay
  const modalOverlay = document.querySelector(".pop-up");
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closePopUp();
    }
  });
});
