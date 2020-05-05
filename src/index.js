const root = document.getElementById('root');
root.innerHTML = `
  <div>
    <custom-loginform content='test' onsubmit='test()'></custom-loginform>
  </div>
`;

const test = (t) => {
  console.log(t, 1);
}
// (function(){
//   const customLoginForm = document.querySelector('custom-loginform');
//   customLoginForm.onSubmit = value => console.log(value)
// }())