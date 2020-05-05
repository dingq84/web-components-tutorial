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
    this.$container = this._shadowRoot.querySelector('.container');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('onClick', {
          detail: 'Hello from within the Custom Element'
        })
      )
    })
  }
  //------------------------------method-------------------------------------//
  // []內放置需要觀察的attributes，沒有放置的話就不會觸發attributeChangedCallback
  static get observedAttributes() {
    return ['label'];
  }
  //------------------------------method-------------------------------------//
  //-----------------------------lifecycle-----------------------------------//
  
  // custom element 添加到html上面的時候觸發，可能在內容渲染之前就觸發
  connectedCallback() {
    console.log('This is connected callback');
    if(this.hasAttribute('as-atom')) {
      this.$container.style.padding = '0px';
    }
  }
  // 被移除的時候觸發
  disconnectedCallback() {
    console.log('This is disconnected callback')
  }
  // 換到其他element底下的時候會觸發
  adoptedCallback() {
    console.log('This is adopted callback');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('This is attribute change callback');
    console.log(name, oldValue, newValue);
    this.render();
  }
  //-----------------------------lifecycle-----------------------------------//
  get label() {
    console.log('label get method')
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  render() {
    this.$button.innerHTML = this.label;
  }
}

window.customElements.define('x-button', Button);