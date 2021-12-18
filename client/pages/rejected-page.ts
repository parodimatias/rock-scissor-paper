import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "rejected-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }

    render() {
      this.className = "welcome-page";
      this.innerHTML = `  
        <div class="container">
            <h1 class="title">Rock Paper Scissor</h1>
              <div class="text">Ups, this room is full and your name is not registered within this room</div>
              <div class="images-container">
                  <custom-move class="hand" move="scissor"></custom-move>
                  <custom-move class="hand" move="rock"></custom-move>
                  <custom-move class="hand" move="paper"></custom-move>
              </div>
        </div>`;
    }
  }
);
