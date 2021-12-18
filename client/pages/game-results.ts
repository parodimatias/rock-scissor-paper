import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "game-results",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }

    render() {
      const cs = state.getState();
      const backgroundWinnerColor = backGroundColor();
      const star = getStarImage();
      this.className = "result-page";
      this.innerHTML = /*html*/ `
        <div class="star-container">
        <img class="star-img" src="${star[1]}" alt="" srcset="">
        <div class="star-text-container">
        <h1 class="star-text">${star[0]}</h1></div></div>
        <result-score p1n=${cs.playerOne.name} p2n=${cs.playerTwo.name} p1r=${cs.playerOneWins} p2r=${cs.playerTwoWins}></result-score>
        <custom-button class="welcome-button">Play Again</custom-button>
        <custom-move class="move computer" move="rock" size ="130"></custom-move>
        <custom-move class="move human" move="scissor" size ="130"></custom-move>
      <style>
  .result-page{
    height:667px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    background-color:${backgroundWinnerColor};
    padding:20px 25px;
  } 
  .star-img{
    width:290px;
    height:auto;
  }
  .star-container{
    position:relative;
  }
  @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
  .star-text-container{
    position:absolute;
    top:25%;
    left:25%;
    width:160px;
    text-align:center;
    margin:0;
  }
  .star-text{
    color:white;
   font-family: 'Odibee Sans', cursive;
    font-size:55px;
  }
  .move{
    opacity:0.5;
  }
  .computer{
    position:absolute;
    top:-1000px;
    transform: rotate(180deg);
    left:45%
  }
  .human{
    position:absolute;
    top:-1000px;
    left:45%;
    overflow:hidden;
  }
</style>
  `;
      const button = document.querySelector(".welcome-button");
      button.addEventListener("click", () => {
        Router.go("/game-room");
      });
    }
  }
);

function backGroundColor() {
  const cs = state.getState();
  let backgroundWinnerColor = "";
  if (cs.lastWinner == cs.name)
    return (backgroundWinnerColor = "rgba(136, 137, 73, 0.9)");
  if (cs.lastWinner == "tie") return (backgroundWinnerColor = "blue");
  return (backgroundWinnerColor = "rgba(137, 73, 73, 0.9)");
}

function getStarImage() {
  const cs = state.getState();
  let message = "";
  let starImageURL = "";
  if (cs.lastWinner == cs.name) {
    starImageURL = require("url:../imgs/win-star.png");
    message = "You Win";
  } else if (cs.lastWinner == "tie") {
    starImageURL = require("url:../imgs/tie-star.png");
    message = "Tie";
  } else {
    starImageURL = require("url:../imgs/lose-star.png");
    message = "You Lose";
  }
  return [message, starImageURL];
}
