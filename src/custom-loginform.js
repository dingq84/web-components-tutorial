function isInvalidEmail(value) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(value);
}

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .login {
      width: 350px;
      height: 420px;
      padding: 50px 30px;
      background: teal;
      border: none;
      box-shadow: 8px 0px 2px 1px gray;
      position: relative;
    }
    .login--title {
      font-wight: bold;
    }
    .login--content {
      color: gray;
      font-size: 18px;
    }
    .login--form {
      height: 180px;
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
    .login--form--error {
      display: none;
      color: rgb(220, 0, 0);
      font-size: 14px;
      margin-top: -20px;
      margin-bottom: -15px;
    }
    .login--form--input[error="true"] ~ p {
      display: block;
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
    .login--form--button:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
    .login--form--bottom {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  </style>
  <div class='login'>
    <h1 class='login--title'>Log In</h1>
    <p class='login--content'>Right at the coast of the Semantics, a large language ocean. A small river named Duden</p>
    <form class='login--form'>
      <input class='login--form--input' autocomplete='off' name='email' type='text' placeholder='Email' />
      <p class='login--form--error'>Email格式錯誤，請再次確認</p>
      <input class='login--form--input' name='password' type='password' placeholder='Password' />
      <input type='submit' class='login--form--button' value='Submit' disabled />
    </form>
    <svg class='login--form--bottom' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#fff" fill-opacity="1" d="M0,224L14.1,229.3C28.2,235,56,245,85,240C112.9,235,141,213,169,218.7C197.6,224,226,256,254,266.7C282.4,277,311,267,339,229.3C367.1,192,395,128,424,117.3C451.8,107,480,149,508,181.3C536.5,213,565,235,593,250.7C621.2,267,649,277,678,272C705.9,267,734,245,762,218.7C790.6,192,819,160,847,128C875.3,96,904,64,932,53.3C960,43,988,53,1016,85.3C1044.7,117,1073,171,1101,176C1129.4,181,1158,139,1186,117.3C1214.1,96,1242,96,1271,96C1298.8,96,1327,96,1355,128C1383.5,160,1412,224,1426,256L1440,288L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z">
      </path>
    </svg>
  </div>
`;

class CustomLoginForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$container = this._shadowRoot.querySelector('.login');
    this.$form = this._shadowRoot.querySelector('form');
    // Check the input is not empty
    this._shadowRoot
      .querySelectorAll('input:not([type="submit"])')
      .forEach(input => {
        input.addEventListener('input', event => {
          const formData = new FormData(this.$form);
          const email = formData.get('email');
          const password = formData.get('password');
          this.$button.disabled = Boolean(!email || !password);
        });
      });
    // Check the email input is match email format
    this._shadowRoot
      .querySelector('input[name="email"]')
      .addEventListener('blur', (event) => {
        event.target.setAttribute('error', isInvalidEmail(event.target.value))
      });
    this.$p = this._shadowRoot.querySelector('p');
    // Submit handler
    this.$button = this._shadowRoot.querySelector('input[type="submit"]');
    this.$button.addEventListener('click', (event) => {
      event.preventDefault();
      const formData = new FormData(this.$form);
      const email = formData.get('email');
      const password = formData.get('password');
      this.dispatchEvent(
        new CustomEvent('onSubmit', { detail: { email, password } })
      );
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