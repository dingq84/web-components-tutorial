const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 400px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 2px 8px 0 rgba(161, 161, 161, 0.4);
      color: #363636;
    }
  </style>
  <div class='container'>
    <button>Click</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('x-button', Button);