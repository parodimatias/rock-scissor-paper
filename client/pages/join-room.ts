import { Router } from "@vaadin/router";
customElements.define(
  "join-room",
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
    <div>Room Code</div>
  <input type="text" class="room-code" placerholder="Room code">
  <custom-button class="join-game-button">Join Room</custom-button>
  </div>
  <div class="images-container">
  <custom-move class="hand" move="scissor"></custom-move>
  <custom-move class="hand" move="rock"></custom-move>
  <custom-move class="hand" move="paper"></custom-move>
  </div>
  </div>`;
    }
  }
);
