import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "game-room",
  class extends HTMLElement {
    connectedCallback() {
      state.subscribe(() => {
        this.render();
      });
      this.render();
    }
    addListener() {
      const playBlock = <HTMLElement>document.querySelector(".play-block");
      const msjBlock = <HTMLElement>document.querySelector(".msj-box");
      const cs = state.getState();
      if (cs.playerTwo) {
        msjBlock.style.display = "none";
        playBlock.style.display = "flex";
      }
      const playButton = document.querySelector(".play-button");
      playButton.addEventListener("click", (e) => {
        e.preventDefault();
        state.unsubscribe();
        state.confirmPlayGame();
        Router.go("/game-room-two");
      });
    }
    render() {
      const cs = state.getState();
      let HTMLstring = "";
      const roomId = cs.roomId;
      const playerOneName = cs.playerOne.name;
      const playerOneWins = cs.playerOneWins;
      let playerTwoName = "Player 2";
      let playerTwoWins = "Disconnected";
      if (cs.playerTwo) {
        playerTwoName = cs.playerTwo.name;
        playerTwoWins = cs.playerTwoWins;
      }

      this.className = "welcome-page";
      HTMLstring = `  
      <div class="container">
      <div class="header">
      <div class="header-players">
      <div class="header-text">${playerOneName} : ${playerOneWins}</div>
      <div class="header-text--orange">${playerTwoName}: ${playerTwoWins}</div>
      </div>
      <div class="header-rooms">
      <div class="header-text">Room</div>
      <div class="header-text--light">${roomId}</div></div>
      </div><div class="msj-box">
      <div class="text">Share this code</div>
      <div class="text-bold">${roomId}</div>
      <div class="text">With your opponent</div>
      </div>
      <div class="play-block style="display:none"><div class="text">Press play and choice: Rock, paper or scissor before times goes up!</div>
                   <custom-button class="play-button">Play</custom-button></div>  
      <div class="images-container">
      <custom-move class="hand" move="scissor"></custom-move>
      <custom-move class="hand" move="rock"></custom-move>
                <custom-move class="hand" move="paper"></custom-move>
                </div>
                </div>`;
      this.innerHTML = HTMLstring;

      this.addListener();
    }
  }
);
