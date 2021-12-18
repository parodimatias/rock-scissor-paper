import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "game-room-two-bis",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    addListener() {}
    render() {
      const cs = state.getState();
      const roomId = cs.roomId;
      const playerOneName = cs.playerOne.name;
      const playerTwoName = cs.playerTwo.name;
      const playerOneWins = cs.playerOneWins;
      const playerTwoWins = cs.playerTwoWins;

      this.className = "welcome-page";
      this.innerHTML =
        /*html*/
        `  
      <div class="container">
      <div class="header">
       <div class="header-players">  
        <div class="header-text">${playerOneName} : ${playerOneWins}</div>
        <div class="header-text--orange">${playerTwoName}: ${playerTwoWins}</div>
        </div>
        <div class="header-rooms">
          <div class="header-text">Room</div>
          <div class="header-text--light">${roomId}</div>
        </div>
       </div>
      <progress-ring class="ring"stroke="11" radius="100" seconds="3"></progress-ring>
      <div class="images-container">
            <custom-move class="hand scissor" move="scissor" hover="true"></custom-move>
            <custom-move class="hand rock" move="rock" hover="true"></custom-move>
            <custom-move class="hand paper" move="paper" hover="true"></custom-move>
          </div>
          </div>`;
      this.addListeners();
    }
    addListeners() {
      const timeLimitId = setTimeout(() => {
        state.addPlayerGame("empty");
        state.unconfirmGamePlay();
        Router.go("./game-room-three");
      }, 3000);
      const scissor = this.querySelector(".scissor");
      const rock = this.querySelector(".rock");
      const paper = this.querySelector(".paper");
      scissor.addEventListener("click", (e) => {
        e.preventDefault();
        state.addPlayerGame("scissor");
        state.unconfirmGamePlay();
        clearTimeout(timeLimitId);
        Router.go("./game-room-three");
      });
      paper.addEventListener("click", () => {
        state.addPlayerGame("paper");
        state.unconfirmGamePlay();
        clearTimeout(timeLimitId);
        Router.go("./game-room-three");
      });
      rock.addEventListener("click", () => {
        state.addPlayerGame("rock");
        state.unconfirmGamePlay();
        clearTimeout(timeLimitId);
        Router.go("./game-room-three");
      });
    }
  }
);
