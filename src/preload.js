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

    const status = document.getElementById('message');
    status.innerHTML = 'Gerando a estrutura de pastas...';

    ipcRenderer.invoke('submit', Object.fromEntries(formData.entries())).then((rs) => {
      
      if (rs.fault) {
        status.innerHTML = 'Error ao criar a estrutura de pastas';
      } else{
        if (rs.exist) {
          status.innerHTML = 'Já existe uma pasta com esse nome';
        } else {
          status.innerHTML = 'Estrutura criada com sucesso';
        }
      }

    });
    
  });

});