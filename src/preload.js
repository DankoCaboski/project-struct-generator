// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('myForm');
  const status = document.getElementById('message');
  const projectNumber = document.getElementById('projectNumber'); 

  form.addEventListener('submit', (event) => {

    const projectNumber = document.getElementById('projectNumber').value;
    const projectName = document.getElementById('projectName').value;
    
    const formData = new FormData(form);
    formData.set('projectNumber', projectNumber);
    formData.set('projectName', projectName);

    event.preventDefault();

    updateStatus(status, "Gerando a estrutura de pastas..."); 

    ipcRenderer.invoke('submit', Object.fromEntries(formData.entries())).then((rs) => {
      if (rs.fault) {
        updateStatus(status, "Error ao criar a estrutura de pastas");
      } else{
        if (rs.exist) {
          updateStatus(status, "Já existe uma pasta com esse nome");
        } else {
          updateStatus(status, "Estrutura criada com sucesso");
        }
      }

    });
    
  });

  projectNumber.addEventListener('input', (event) => {
    const projectName = document.getElementById('projectName');
    const value = projectNumber.value;

    if (value < 0) {
      projectNumber.value = '';
      updateStatus(status, "O número do projeto não pode ser negativo");
    } else {
      projectNumber.value = value;
      updateStatus(status, "Aguardando...");
    }
  });

});

function updateStatus(tag, msg) {
  tag.innerHTML = String(msg);
}