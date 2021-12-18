import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "game-room-two",
  class extends HTMLElement {
    connectedCallback() {
      state.subscribe(() => {
        this.render();
      });
      this.render();
    }
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
          <div class="text">Waiting for other player</div>
          <div class="images-container">
              <custom-move class="hand scissor" move="scissor" hover="true"></custom-move>
              <custom-move class="hand rock" move="rock" hover="true"></custom-move>
              <custom-move class="hand paper" move="paper" hover="true"></custom-move>
            </div>
          </div>`;
      if (cs.playerTwo.play == 1 && cs.playerOne.play == 1) {
        state.unsubscribe();
        Router.go("./game-room-two-bis");
      }
    }
  }
);
