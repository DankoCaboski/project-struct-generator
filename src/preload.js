// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require('electron');


document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('myForm');

  form.addEventListener('submit', (event) => {

    const projectNumber = document.getElementById('projectNumber').value;
    const projectName = document.getElementById('projectName').value;
    
    const formData = new FormData(form);
    formData.set('projectNumber', projectNumber);
    formData.set('projectName', projectName);

    event.preventDefault();
    
    ipcRenderer.invoke('submit', Object.fromEntries(formData.entries())).then((rs) => {
      const status = document.getElementById('message');
      
      if (rs.exist) {
        status.innerHTML = 'Folder already exists';
      } else {
        status.innerHTML = 'Folder created';
      }
    });
    
  });

});