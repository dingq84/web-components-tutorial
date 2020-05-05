const template = document.createElement('template');

template.innerHTML = `
  <style>
    .login {
      width: 350px;
      height: 380px;
      padding: 50px 30px;
      background: teal;
      box-shadow: 0 2px 8px gray, 2px 4px 4px 0 gray;
    }
    .login--title {
      font-wight: bold;
    }
    .login--content {
      color: gray;
      font-size: 18px;
    }
    .login--form {
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .login--form--input {
      display: block;
      height: 30px;
      font-size: 14px;
      border: none;
    }
    .login--form--button {
      width: 100px;
      height: 35px;
      text-align: center;
      outline: none;
      border: none;
      color: white;
      font-size: 14px;
      line-height: 35px;
      background-color: #FE6856;
      cursor: pointer;
    }
  </style>
  <div class='login'>
    <h1 class='login--title'>Log In</h1>
    <p class='login--content'>Right at the coast of the Semantics, a large language ocean. A small river named Duden</p>
    <form class='login--form'>
      <input class='login--form--input' name='email' type='text' placeholder='Email' />
      <input class='login--form--input' name='password' type='password' placeholder='Password' />
      <input type='submit' class='login--form--button' value='Submit'/>
    </form>
  </div>
`;

class CustomLoginForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$container = this._shadowRoot.querySelector('.login');
    this.$form = this._shadowRoot.querySelector('form');
    this.$p = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', (event) => {
      this.dispatchEvent(
        new CustomEvent('onSubmit')
      );
      event.preventDefault();
      const formData = new FormData(this.$form);
      const email = formData.get('email');
      const password = formData.get('password');
      console.log(email, password, 123);
    })
  }

  connectedCallback() {
    if(this.hasAttribute('dark')) {
      this.$container.style.background = 'rgba(17, 17, 17, 0.8)';
    }
  }

  static get observedAttributes() {
    return ['content'];
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(value) {
    this.setAttribute('content', value);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.$p.innerHTML = this.content;
  }
}

window.customElements.define('custom-loginform', CustomLoginForm);