import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "home-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    addListeners() {
      const newGameButton = document.querySelector(".new-game-button");
      newGameButton.addEventListener("click", (e) => {
        e.preventDefault();
        const cs = state.getState();
        cs.roomId = false;
        Router.go("/insert-name");
      });
      const joinRoomButton = document.querySelector(".join-room-button");
      joinRoomButton.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/join-room");
      });
    }

    render() {
      this.className = "welcome-page";
      this.innerHTML = `  
        <div class="container">
            <h1 class="title">Rock Paper Scissor</h1>
            <div class="buttons-container--index">
                <custom-button class="new-game-button">New Game</custom-button>
                <custom-button class="join-room-button">Join Room</custom-button>
            </div>
            <div class="images-container">
                <custom-move class="hand" move="scissor"></custom-move>
                <custom-move class="hand" move="rock"></custom-move>
                <custom-move class="hand" move="paper"></custom-move>
            </div>
        </div>`;
      this.addListeners();
    }
  }
);
