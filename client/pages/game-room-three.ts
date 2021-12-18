import { Router } from "@vaadin/router";
import { state } from "../state";
customElements.define(
  "game-room-three",
  class extends HTMLElement {
    connectedCallback() {
      state.subscribe(() => {
        this.render();
      });
      this.render();
    }
    addListener() {
      const cs = state.getState();
      if (cs.playerOne.play == 0 && cs.playerTwo.play == 0) {
        const timeOutId = setTimeout(() => {
          state.unsubscribe();
          state.getWinnerAndScore();
          Router.go("./game-results");
        }, 3000);
      }
    }
    render() {
      const cs = state.getState();
      let HTMLstring = "";
      const result = function () {
        if (cs.playerOne.play == 0 && cs.playerTwo.play == 0) {
          if (cs.name == cs.playerTwo.name) {
            return `
          <custom-move class="other-move" move="${
            cs.playerOneMoves[cs.playerTwoMoves.length - 1]
          }" size="130"></custom-move>
          <custom-move class="your-move" move="${
            cs.playerTwoMoves[cs.playerTwoMoves.length - 1]
          }" size="130"></custom-move>
      `;
          }
          if (cs.name == cs.playerOne.name) {
            return `
          <custom-move class="other-move" move="${
            cs.playerTwoMoves[cs.playerOneMoves.length - 1]
          }" size="130"></custom-move>
          <custom-move class="your-move" move="${
            cs.playerOneMoves[cs.playerOneMoves.length - 1]
          }" size="130"></custom-move>
      `;
          }
        }
        return `<h1>Loading</h1>`;
      };
      this.className = "welcome-page";
      HTMLstring =
        /*html*/
        `
      <div class="container">
       ${result()}
        </div>
          <style>
          .other-move {
            transform: rotate(180deg);
            position:absolute;
            top:0px;
          }
          .your-move{
           position:absolute;
           bottom:0px
          }
          </style>`;
      this.innerHTML = HTMLstring;
      this.addListener();
    }
  }
);
