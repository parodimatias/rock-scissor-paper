export function timeCounterComponent() {
  window.customElements.define(
    "progress-ring",
    class extends HTMLElement {
      _circumference: number;
      _root: ShadowRoot;
      constructor() {
        super();
        this.render();
      }
      render() {
        this._root = this.attachShadow({ mode: "open" });
        const stroke: number = +this.getAttribute("stroke");
        const radius: number = +this.getAttribute("radius");
        const seconds: number = +this.getAttribute("seconds");
        const normalizedRadius = radius - stroke * 2;
        this._circumference = normalizedRadius * 2 * Math.PI;
        this._root.innerHTML = /*html*/ `
        <div class="container">
      <svg height="${radius * 2}" width="${radius * 2}">
        <circle stroke="black" stroke-width="${stroke}" fill="transparent" r="${normalizedRadius}" cx="${radius}" cy="${radius}"/>

        </svg>
        <h1 class="counter"></h1>
        </div>
      <style>
        .container{
          position:relative;
        }
        circle {
          stroke-dasharray: ${this._circumference} ${this._circumference};
          stroke-dashoffset:${this._circumference};
          transition: stroke-dashoffset 0.1s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          position:absolute;
        }
        .counter{
          font-family: "MyAmerican";
          font-weight:bold;
          --fontsize: 100px;
          position: absolute;
          top:${radius - stroke - 50}px;
          left :${radius - stroke - 19}px;
          margin:0;
          font-size:var(--fontsize);

        } 
      </style>
    `;

        this.timer(seconds);
      }
      setProgress(percent, seconds) {
        const offset =
          this._circumference - (percent / 100) * this._circumference;
        const circle = this._root.querySelector("circle");
        circle.style.strokeDashoffset = offset.toString();
        const number = this._root.querySelector(".counter");
        number.textContent = `${Math.ceil(seconds)}`;
      }
      timer(seconds) {
        let progress = 0;
        let secondsCounter = seconds;
        const interval = setInterval(() => {
          progress += 10 / seconds;
          if (progress > 100) {
            progress = 100;
            clearInterval(interval);
          }
          this.setProgress(progress, secondsCounter);
          secondsCounter -= 100 / 1000;
        }, 100);
      }
    }
  );
}
