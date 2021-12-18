import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "insert-name",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    render() {
      this.className = "welcome-page";
      this.innerHTML = `  
  <div class="container">
  <h1 class="title">Rock Paper Scissor</h1>
  <div class="buttons-container">
  <div>Your Name</div>
  <input type="text" class="input-name" placerholder="Room code">
  <custom-button class="game-button">Start</custom-button>
  </div>
  <div class="images-container">
  <custom-move class="hand" move="scissor"></custom-move>
  <custom-move class="hand" move="rock"></custom-move>
  <custom-move class="hand" move="paper"></custom-move>
  </div>
  </div>`;
      const gameButton = document.querySelector(".game-button");
      const inputName = <HTMLInputElement>document.querySelector(".input-name");
      gameButton.addEventListener("click", () => {
        const cs = state.getState();
        cs.name = inputName.value;
        cs.playerOneMoves = [];
        cs.playerTwoMoves = [];
        state.setState(cs);
        state.signIn(() => {
          const cs = state.getState();
          if (cs.roomId) {
            state.accessToRoom(() => {
              Router.go("/game-room");
            });
          } else {
            state.askNewRoom(() => {
              Router.go("/game-room");
            });
          }
        });
      });
    }
  }
);
