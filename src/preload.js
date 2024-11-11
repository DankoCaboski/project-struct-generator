// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require('electron');


document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('myForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let res = ipcRenderer.sendSync('submit', 'ping');
    console.log(res);
  });
});