// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('myForm');
  const toConfig = document.getElementById('toConfig');

  var toHome = null;
  var configForm = null;

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
      console.log(rs);
      for (const key in rs) {
        if (rs.hasOwnProperty(key)) {
          console.log(`${key}: ${rs[key]}`);
        }
      }
      if (rs.error) {
        updateStatus(status, rs.message);
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
    const value = projectNumber.value;

    if (value < 0) {
      projectNumber.value = '';
      updateStatus(status, "O número do projeto não pode ser negativo");
    } else {
      projectNumber.value = value;
      updateStatus(status, "Aguardando...");
    }
  });

  toConfig.addEventListener('click', (event) => {
    window.location.href = './pages/config/config.html';
  });

  toHome.addEventListener('click', (event) => {
    window.location.href = './index.html';
  });

  window.addEventListener('load', (event) => {
    configForm = document.getElementById('configForm');
    if (configForm) {
      console.log('configForm');
    }
  });

});

function updateStatus(tag, msg) {
  tag.innerHTML = String(msg);
}