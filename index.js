function fetchData(callBack) {
  fetch("https://valorant-api.com/v1/playercards")
    .then((response) => response.json())
    .then((cardsData) => callBack(cardsData["data"]));
}

function formDisplay() {
  document.querySelector("section#sign-up").style.display = "none";
  let signUp = document.querySelector("p#sign-up-nav");
  signUp.addEventListener("click", function () {
    document.querySelector("section#sign-up").setAttribute("style", "");
    let signUpSubmit = document.querySelector("button#sign-up-button");
    signUpSubmit.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector("section#sign-up").style.display = "none";
    });
  });
}
formDisplay();

function submitAlert() {
  function alertTimeout() {
    alert("Sign up successful");
  }
  setTimeout(alertTimeout, 10);
}
//selects the next Image when choosing an avatar

function imageSelection(apiArray) {
  let firstImage = 0;
  let currentImage = document.querySelector("img#player-avatar");
  currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
  console.log(apiArray);

  let nextImage = document.querySelector("button#next-image");
  nextImage.addEventListener("click", function () {
    firstImage = firstImage + 1;
    currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
  });

  let previousImage = document.querySelector("button#previous-image");
  previousImage.addEventListener("click", function () {
    if (firstImage > 0) {
      firstImage = firstImage - 1;
    } else {
      firstImage = 0;
    }
    currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
  });

  let selectImage = document.querySelector("button#select-image");
  selectImage.addEventListener("click", function () {
    let selectedImage = document.createElement("img");
    selectedImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
    let imageSection = document.querySelector("section#hall-of-fame");
    imageSection.append(selectedImage);
  });
}

fetchData(imageSelection);

function addName() {
  let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
  hallOfFameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (event.target.inGameName.value != "") {
      let formInputs = document.querySelector("section#hall-of-fame");
      let setInGameName = document.createElement("p");
      setInGameName.textContent = event.target.inGameName.value;
      formInputs.append(setInGameName);
      let currentNames = document.querySelectorAll("section#hall-of-fame p");
      for (let i = 0; i <= currentNames.length - 1; i++) {
        for (let j = i + 1; j <= currentNames.length - 1; j++) {
          if (currentNames[i].textContent === currentNames[j].textContent) {
            currentNames[j].remove();
          }
        }
      }
    }
  });
} 
addName();

function addGame(){
  let gamesList = document.querySelector("section#hall-of-fame")
  let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
  hallOfFameForm.addEventListener("submit", function (event) {
event.preventDefault()
let checkedBoxes = document.querySelectorAll("input[type = checkbox]:checked")
for(let checkedBox of checkedBoxes){
 let box =  document.createElement("p")
 box.textContent = checkedBox.value
 gamesList.append(box)
 
}

}
)
}
addGame()
