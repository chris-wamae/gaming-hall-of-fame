
function fetchData(callBack){
fetch("https://valorant-api.com/v1/playercards")
  .then((response) => response.json())
  .then((cardsData) => callBack(cardsData["data"]))
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
let firstImage = 0
function imageSelection(apiArray){
  console.log(apiArray)
let nextImage = document.querySelector("button#next-image")
nextImage.addEventListener("click",function(){
let currentImage = document.querySelector("img#player-avatar")
currentImage.setAttribute("src",apiArray[firstImage]["displayIcon"])
firstImage += 1})

let previousImage = document.querySelector("button#previous-image")
previousImage.addEventListener("click",function(){
let currentImage = document.querySelector("img#player-avatar")
currentImage.setAttribute("src",apiArray[firstImage]["displayIcon"])
if(firstImage > 0){
firstImage += -1
}})

}


fetchData(imageSelection)