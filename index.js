fetch("https://valorant-api.com/v1/playercards")
.then(response => response.json())
.then(cardsData => {console.log(cardsData.data[0]["displayIcon"])
               let playerCard1 = document.querySelector("img")
                playerCard1.setAttribute("src",`${cardsData.data[0]["displayIcon"]}`)})