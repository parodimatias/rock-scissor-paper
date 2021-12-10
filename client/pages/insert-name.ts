import { Router } from "@vaadin/router";
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
  <input type="text" class="room-code" placerholder="Room code">
  <custom-button class="go-back">Start</custom-button>
  </div>
  <div class="images-container">
  <custom-move class="hand" move="scissor"></custom-move>
  <custom-move class="hand" move="rock"></custom-move>
  <custom-move class="hand" move="paper"></custom-move>
  </div>
  </div>`;
      const goBackButton = document.querySelector(".go-back");
      goBackButton.addEventListener("click", () => {
        console.log("hola");
        Router.go("/");
      });
    }
  }
);
