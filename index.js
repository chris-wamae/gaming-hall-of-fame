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

function imageSelection(apiArray){
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
  let divNumber = 0
  selectImage.addEventListener("click", function () {
    let selectedImage = document.createElement("img");
    let playerDiv = document.createElement("div")
    playerDiv.setAttribute("id",`playerDiv${divNumber}`)
    divNumber = divNumber + 1
    console.log(`Image selection Div number:${divNumber}`)


    selectedImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
    let imageSection = document.querySelector("section#hall-of-fame");
    playerDiv.append(selectedImage);
    imageSection.append(playerDiv)
    selectImage.style.display = "none"
  });}

fetchData(imageSelection);

function addName() {
  let divNumber = 0
  let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
  hallOfFameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (event.target.inGameName.value != "") {
      let setInGameName = document.createElement("p");
      setInGameName.setAttribute("class","in-game-name")
      setInGameName.textContent = event.target.inGameName.value;
      let displayDiv = document.querySelector(`div#playerDiv${divNumber}`)
      
      displayDiv.append(setInGameName);
      let currentNames = document.querySelectorAll(`section#hall-of-fame p.in-game-name`)
      
      
      for (let i = 0; i <= currentNames.length - 1; i++) {
        for (let j = i + 1; j <= currentNames.length - 1; j++) {
          if (currentNames[i].textContent === currentNames[j].textContent) {
            currentNames[j].remove()
           //alert("User already exists")
           ;
          }
          
        }
      }
    }
    divNumber = divNumber + 1
    console.log(`Name selection Div number:${divNumber}`)});
} 
addName();

function addGame(){
  let divNumber = 0
  let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
  hallOfFameForm.addEventListener("submit", function (event) {
event.preventDefault()
let nameCheck = event.target.inGameName.value
let nameExistanceCheck = document.querySelector(`div#playerDiv${divNumber}`)
console.log(nameExistanceCheck.lastChild.nodeName)
if(nameCheck != "" && nameExistanceCheck.lastChild.nodeName != "IMG"){
let gamesList = document.querySelector(`div#playerDiv${divNumber}`)
let checkedBoxes = document.querySelectorAll("input[type = checkbox]:checked")
for(let checkedBox of checkedBoxes){
 let box =  document.createElement("p")
 box.setAttribute("class","game-name")
 box.textContent = checkedBox.value
 gamesList.append(box)}}
 //else{alert("Please enter a unique in game name")}
 let currentGames = document.querySelectorAll(`div#playerDiv${divNumber} p.game-name`);
 divNumber = divNumber + 1
 console.log(`Game selection Div number:${divNumber}`)
      for (let i = 0; i <= currentGames.length - 1; i++) {
        for (let j = i + 1; j <= currentGames.length - 1; j++) {
          if (currentGames[i].textContent === currentGames[j].textContent) {
            currentGames[j].remove();
  }
}
}
let playerDivElements = document.querySelectorAll("section#hall-of-fame div")
for(let divs of playerDivElements){
  let emptyCheck = divs.lastChild.nodeName
  if(emptyCheck === "IMG"){
    divs.style.display = "none";


  }
  }})}

function divReset(divNumber){
 let reset = divNumber * 0
 return reset
}


addGame()
