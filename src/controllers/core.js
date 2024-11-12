const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

const leafs = ["00 -Proposta Tecnica - Escopo - Caderno de Encargos",
                "01 - Premissas do Projeto",
                "02 - E-mail", "03 - Kick-off",
                "04 - Project - TimeBase",
                "05 - Projeto Mecanico",
                "06 - Projeto Eletrico",
                "07 - Programas de PLC ROBO e IHM",
                "08 - Check List de atividades",
                "09 - Status Report",
                "10 - Relatorios e Manuais",
                "Material bruto"];

async function generateProject(projData) {
  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const projctRootPath = path.join("\\\\AXIS-SERVER\\Documents\\02_Projetos\\0000_TesteRPA", projctRoot);

  return generateBranchFolder(projctRootPath);
}

async function generateBranchFolder(projctRootPath) {
  var exists = folderExists(projctRootPath);
  var fault = false;

  if (!exists) {
    if (!createFolder(projctRootPath)) {
      fault = true;
    }
    else {
      generateLeafFolders(projctRootPath);
    }
  }
  
  const result = {
    exist: exists,
    fault: fault,
    projctRootPath: projctRootPath
  };

  return result;
}

async function generateLeafFolders(projctRootPath) {
  leafs.forEach(leaf => {
    const leafPath = path.join(projctRootPath, leaf);
    createFolder(leafPath);
  });
}

module.exports = {
  generateProject
};