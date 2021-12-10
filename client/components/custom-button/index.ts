export function buttonComponent() {
  customElements.define(
    "custom-button",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        style.innerText = `
      .container{
        width:100%
      }
      .button{
      @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
      font-family: 'Odibee Sans', cursive;
      font-size:45px;
      color:white;
      background: #006CFC;
      border: 10px solid #001997;
      box-sizing: border-box;
      border-radius: 10px;
      height:84px;
      width:365px;
      }`;

        div.className = "container";
        div.innerHTML = `
        <button class="button">${this.textContent}</button>  
    `;
        shadow.appendChild(div);
        shadow.appendChild(style);
      }
    }
  );
}
