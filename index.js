fetch("https://valorant-api.com/v1/playercards")
  .then((response) => response.json())
  .then((cardsData) => {
    console.log(cardsData.data);
    let playerCard1 = document.querySelector("img#player-avatar");
    playerCard1.setAttribute("src", `${cardsData.data[0]["displayIcon"]}`);
    let images = cardsData.data
    
    for(i=0;i <= images.length;i++){
     
    }
  });


function ImageSelection(){
  let nextImage = document.querySelector("button#next-image")
  let previousImage = document.querySelector("button#previous-image")
  let selectImage = document.querySelector("button#select-image")


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
