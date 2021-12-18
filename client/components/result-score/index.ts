import { state } from "../../state";
export function resultScoreComponent() {
  customElements.define(
    "result-score",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const playerOneName = this.getAttribute("p1n");
        const playerOneResult = this.getAttribute("p1r");
        const playerTwoName = this.getAttribute("p2n");
        const playerTwoResult = this.getAttribute("p2r");
        const div = document.createElement("div");
        div.className = "container";
        const style = document.createElement("style");
        style.innerText = /*css*/ `
            @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
  
        .container{
            box-sizing: border-box;
            background-color:white;
            width:259px;
            height:217px;
            border: 10px solid #000000;
            border-radius: 10p;
            display:flex;
            flex-direction: column;
            align-items:center;
    
            justify-content:space-between;
        }
        .text{
            text-align:right;
            width:100%;
            margin-right:10px;
        }
        h1{
        font-family: 'Odibee Sans', cursive;
        font-size:50px;
        margin:0;
    }
    h2{
            font-family: 'Odibee Sans', cursive;
            font-size:35px;
            
            margin:0;
            margin-bottom:10px;
        }`;

        div.innerHTML = /*html*/ `
            <h1>Score</h1>
            <div class="text">
            <h2>${playerOneName} : ${playerOneResult}</h2>
            </div>
            <div class="text">
            <h2>${playerTwoName} : ${playerTwoResult}</h2>
            </div>
        
         `;

        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
