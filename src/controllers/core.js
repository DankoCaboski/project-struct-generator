const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

const leafs = ["00 - Proposta Tecnica - Escopo - Caderno de Encargos",
                "01 - kickoff",
                "02 - ciclocrama",
                "03- Projeto Mecanico",
                "04 - Projeto Eletrico",
                "05 - Programas de PLC ROBO e IHM",
                "06 - Check List de atividades",
                "07 - Status Report",
                "08 - Relatorios e Manuais",
                "Material bruto"];

async function generateProject(projData) {
  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const basePath = require("..\\properties\\config.json").branchPath.whereToCreate
  const projctRootPath = path.join(basePath, projctRoot);

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