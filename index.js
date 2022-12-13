fetch("https://valorant-api.com/v1/playercards")
  .then((response) => response.json())
  .then((cardsData) => {
    console.log(cardsData.data);
    let playerCard1 = document.querySelector("img");
    playerCard1.setAttribute("src", `${cardsData.data[223]["displayIcon"]}`);
  });

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
