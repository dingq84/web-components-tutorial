const root = document.getElementById('root');
root.innerHTML = `
  <div>
    <custom-loginform></custom-loginform>
  </div>
`;

document.querySelector('custom-loginform').addEventListener('onSubmit', event => { console.log(event.detail)})