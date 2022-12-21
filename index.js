document.addEventListener("DOMContentLoaded", function () {
  //Prevents the javascript from being run before the html loads
  function fetchData(callBack) {
    fetch("https://valorant-api.com/v1/playercards")
      .then((response) => response.json())
      .then((cardsData) => callBack(cardsData["data"]));
  }

  function formDisplay() {
    //This fuction creates the sign up form and hides and displays it whenever it is needed
    document.querySelector("section#sign-up").style.display = "none"; //hides the form
    let signUp = document.querySelector("p#sign-up-nav");
    signUp.addEventListener("click", function () {
      document.querySelector("section#sign-up").setAttribute("style", ""); //shows the form
      //
    });
  }
  formDisplay();

  //This function hides the form after sign-up
  //It also alerts a user when they try to sign up but have left an input empty
  //Finally it alerts a user when they sign-up successfully
  function handleSignUpAlert() {
    let form = document.getElementById("sign-up-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let nameInput = event.target.signUpName.value;
      let emailInput = event.target.signUpEmail.value;
      let passwordInput = event.target.signUpPassword.value;
      if (nameInput === "" || emailInput === "" || passwordInput === "") {
        alert("Please fill all fields to sign up");
      } else {
        event.preventDefault();
        document.querySelector("section#sign-up").style.display = "none"; //hides the form
        form.reset();
        submitAlert();
      }
    });
  }
  handleSignUpAlert();

  function submitAlert() {
    //alerts a user that their sign up was successful
    function alertTimeout() {
      alert("Successful");
    }
    setTimeout(alertTimeout, 10);
  }

  //allows a user to navigate through images fetched from the api to the DOM
  //a user can navigate to the next image and also go back to the previous image
  //a user can also select an image to be displayed as their avatar
  function imageSelection(apiArray) {
    let firstImage = 0;
    let currentImage = document.querySelector("img#player-avatar");
    currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
    console.log(apiArray);
    //displayes the next image when clicked
    let nextImage = document.querySelector("button#next-image");
    nextImage.addEventListener("click", function () {
      firstImage = firstImage + 1;
      currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
    });
    //displays the previous image when clicked
    let previousImage = document.querySelector("button#previous-image");
    previousImage.addEventListener("click", function () {
      if (firstImage > 0) {
        firstImage = firstImage - 1;
      } else {
        firstImage = 0;
      }
      currentImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
    });
    //selects the currently displayed image to be the users avatar
    let selectImage = document.querySelector("button#select-image");
    let divNumber = 0;
    selectImage.addEventListener("click", function () {
      let selectedImage = document.createElement("img");
      let playerDiv = document.createElement("div");
      playerDiv.setAttribute("id", `playerDiv${divNumber}`);
      divNumber = divNumber + 1;
      console.log(`Image selection Div number:${divNumber}`);
      document.querySelector("p#join-hall-of-fame").style.display = "none"; //hides the form

      selectedImage.setAttribute("src", apiArray[firstImage]["displayIcon"]);
      let imageSection = document.querySelector("section#hall-of-fame");
      playerDiv.append(selectedImage);
      imageSection.append(playerDiv);
      selectImage.style.display = "none"; //hides the form
    });
  }

  fetchData(imageSelection);

  //Allows a user to input  a name which will be combined with the previously selected
  //image and added to the DOM
  //It also a button below the name which allows a user to delete their added name and
  //exit the hall of fame
  function addName() {
    let divNumber = 0;
    let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
    hallOfFameForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let wholeSection = document.querySelector(
        `section#hall-of-fame div#playerDiv${divNumber}`
      );
      if (
        event.target.inGameName.value != "" &&
        wholeSection.lastChild.nodeName === "IMG"
      ) {
        let setInGameName = document.createElement("p");
        setInGameName.setAttribute("class", "in-game-name");
        setInGameName.textContent = event.target.inGameName.value.toUpperCase();
        let exitButton = document.createElement("button");
        exitButton.textContent = "X";
        colorChange();

        let displayDiv = document.querySelector(`div#playerDiv${divNumber}`);
        displayDiv.append(setInGameName);
        displayDiv.append(exitButton);
        displayDiv.scrollIntoView({ behavior: "smooth" });
        exitButton.addEventListener("click", function () {
          document
            .querySelector("p#join-hall-of-fame")
            .setAttribute("style", "");
          displayDiv.remove();
        });
        divNumber = divNumber + 1;
        console.log(`Name selection Div number:${divNumber}`);

        let currentNames = document.querySelectorAll(
          `section#hall-of-fame p.in-game-name`
        );
        //removes duplicate names from the DOM
        for (let i = 0; i <= currentNames.length - 1; i++) {
          for (let j = i + 1; j <= currentNames.length - 1; j++) {
            if (currentNames[i].textContent === currentNames[j].textContent) {
              currentNames[j].nextSibling.remove();
              currentNames[j].remove();

              //alert("User already exists")
            }
          }
        }
      } else {
        if (wholeSection.lastChild.nodeName === "IMG") {
          divNumber = divNumber + 1;
          console.log(`Name selection Div number:${divNumber}`);
        }
      }
      document
        .querySelector("p#join-hall-of-fame")
        .setAttribute("style", "none"); //hides the form
    });
  }
  addName();

  //Allows a user to select the type of Games they play and have them added to the DOM next to
  //their inputted in game name and avatar
  //It also prevents games from being added when there is no username and avatar added
  function addGame() {
    let divNumber = 0;
    let hallOfFameForm = document.querySelector("form#hall-of-fame-form");
    hallOfFameForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let nameCheck = event.target.inGameName.value;
      let nameExistanceCheck = document.querySelector(
        `div#playerDiv${divNumber}`
      );
      if (nameCheck != "" && nameExistanceCheck.lastChild.nodeName != "IMG") {
        let gamesList = document.querySelector(`div#playerDiv${divNumber}`);
        divNumber = divNumber + 1;
        console.log(`Game selection Div number:${divNumber}`);
        let checkedBoxes = document.querySelectorAll(
          "input[type = checkbox]:checked"
        );
        for (let checkedBox of checkedBoxes) {
          let box = document.createElement("p");
          box.setAttribute("class", "game-name");
          box.textContent = checkedBox.value;
          gamesList.append(box);
        }
      } else if ((nameExistanceCheck.lastChild.nodeName = "IMG")) {
        divNumber = divNumber + 1;
        console.log(`Game selection Div number:${divNumber}`);
      }
      let currentGames = document.querySelectorAll(
        `div#playerDiv${divNumber} p.game-name`
      );
      for (let i = 0; i <= currentGames.length - 1; i++) {
        for (let j = i + 1; j <= currentGames.length - 1; j++) {
          if (currentGames[i].textContent === currentGames[j].textContent) {
            currentGames[j].remove();
          }
        }
      }
      let playerDivElements = document.querySelectorAll(
        "section#hall-of-fame div"
      );
      for (let divs of playerDivElements) {
        let emptyCheck = divs.lastChild.nodeName;
        if (emptyCheck === "IMG") {
          divs.remove();
        }
      }
    });
  }
  function divReset(divNumber) {
    let reset = divNumber * 0;
    return reset;
  }

  addGame();

  //This function allows a user to join the hall of fame by clicking the Join hall of fame menu link
  //It scrolls the page to the Join hall of fame form when clicked
  //It shows the select image button when clicked
  function joinHallOfFame() {
    let menuHallJoin = document.querySelector("p#join-hall-of-fame");
    menuHallJoin.addEventListener("click", function () {
      document.querySelector("form#hall-of-fame-form").reset();
      let completeEntryCheck = document.querySelectorAll(
        "section#hall-of-fame div"
      );
      for (let entry of completeEntryCheck) {
        if (entry.lastChild.nodeName === "IMG") {
          let hiddenButton = document.querySelector("button#select-image");
          hiddenButton.setAttribute("style", "");
          entry.remove();
        } else if (entry.lastChild.nodeName != "IMG") {
          let hiddenButton = document.querySelector("button#select-image");
          hiddenButton.setAttribute("style", ""); //shows the element
        }
      }
      let hallSectionCheck = document.querySelector("section#hall-of-fame");
      console.log(hallSectionCheck);
      console.log(hallSectionCheck.lastChild.name);
      if (hallSectionCheck.lastChild.name === undefined) {
        let hiddenButton = document.querySelector("button#select-image");
        hiddenButton.setAttribute("style", "");
      }
    });
  }
  joinHallOfFame();

  //This function creates a feedback form in which a user enters their name and feedback
  //This function also alerts a user that their feedback has been submitted when the sumbit
  //button is clicked
  function feedBackForm() {
    document.querySelector("section#feedback-form").style.display = "none"; //hides the form
    document
      .querySelector("p#leave-feedback")
      .addEventListener("click", function () {
        document
          .querySelector("section#feedback-form")
          .setAttribute("style", ""); //shows the element
      });
  }
  feedBackForm();

  function handleFeedbackAlert() {
    document
      .querySelector("form#feedback")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let feedBackMessage = event.target.feedbackInput.value;
        let feedbackName = event.target.feedbackName.value;
        if (feedBackMessage === "" || feedbackName === "") {
          alert("Please fill out all the fields");
        } else {
          document.querySelector("form#feedback").reset();
          document.querySelector("section#feedback-form").style.display =
            "none"; //hides the form
          submitAlert();
        }
      });
  }
  handleFeedbackAlert();

  //This function constantly changes the colors of the text
  //in the Hall of Fame
  function colorChange() {
    let firstColor = document.querySelectorAll("section#hall-of-fame div");
    firstColor.forEach(function (element) {
      setInterval(function () {
        element.style.color = "#EC0808";
      }, 250);
    });
    let secondColor = document.querySelectorAll("section#hall-of-fame div");
    secondColor.forEach(function (element) {
      setInterval(function () {
        element.style.color = "#FF00B7";
      }, 500);
    });
    let thirdColor = document.querySelectorAll("section#hall-of-fame div");
    thirdColor.forEach(function (element) {
      setInterval(function () {
        element.style.color = "#0084FF";
      }, 750);
    });
    let fourthColor = document.querySelectorAll("section#hall-of-fame div");
    fourthColor.forEach(function (element) {
      setInterval(function () {
        element.style.color = "#F1D302";
      }, 1000);
    });
    let fifthColor = document.querySelectorAll("section#hall-of-fame div");
    fifthColor.forEach(function (element) {
      setInterval(function () {
        element.style.color = "#00FFCC";
      }, 1250);
    });
  }
  //function hallOfFameScroll() {}

  //This allows a user to search for a player using their username
  //If the search result matches with a user currenlty in the DOM the
  //page will scroll to the player
  function searchPlayer() {
    let searchForm = document.querySelector("form#search-form");
    searchForm.addEventListener("submit", function scroller(event) {
      event.preventDefault();
      let inGameNames = document.querySelectorAll("p.in-game-name");
      let inputEntry = event.target.searchBar.value.toUpperCase();
      if (inputEntry === "") {
        alert("Please enter a player name");
      } else {
        if (inGameNames.length === 0) {
          console.log(inGameNames);
          alert("Player does not exist");
        } else {
          inGameNames = document.querySelectorAll("p.in-game-name");
          for (let inGameNamePElement of inGameNames) {
            let inGameName = inGameNamePElement.textContent;
            if (inGameName === inputEntry) {
              inGameNamePElement.parentNode.scrollIntoView({
                behavior: "smooth",
              });
              //searchForm.removeEventListener("submit",scroller);
              searchForm.reset();
            } else {
              alert("Player does not exist");
              searchForm.reset();
            }
          }
        }
      }
    });
  }
  searchPlayer();

  //Prevents the default behavior of the form
  function preventDefault() {
    let preventDefaultBehavior = document.querySelector("form#search-form");
    preventDefaultBehavior.addEventListener("submit", function scroller(event) {
      event.preventDefault();
    });
  }
  preventDefault();
});
