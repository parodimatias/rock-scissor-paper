export function moveComponent() {
  const scissorImageURL = require("url:../../imgs/tijera.png");
  const rockImageURL = require("url:../../imgs/piedra.png");
  const paperImageURL = require("url:../../imgs/papel.png");
  customElements.define(
    "custom-move",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        div.className = "container";
        const style = document.createElement("style");
        const move = this.getAttribute("move");
        const hover = this.getAttribute("hover");
        const size = this.getAttribute("size");
        let imageURL = "";
        switch (move) {
          case "scissor":
            imageURL = scissorImageURL;
            break;
          case "rock":
            imageURL = rockImageURL;
            break;
          case "paper":
            imageURL = paperImageURL;
            break;
          default:
            console.error("Wrong move attribute");
        }
        style.innerText = /*css*/ `
        .container{
          display: inline-block;
    
        }
        .image{
          width:${size}px;
        }
            `;
        if (hover) {
          style.innerText =
            style.innerText +
            ` .image{
          opacity:0.5;
          width:100%;
          height:auto;
        }
        .image:hover{
          opacity:1;
          width:150%;
          height:auto;
          position:relative;
          bottom:60px;
          cursor: pointer;
        }`;
        }
        div.innerHTML = `
        <img class="image" src=${imageURL} alt="${move}">
    `;
        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
