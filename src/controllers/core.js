const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

async function myLogic(projData) {

  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const projctRootPath = path.join("\\\\AXIS-SERVER\\Documents\\02_Projetos\\0000_TesteRPA", projctRoot);

  var exists = folderExists(projctRootPath);

  if (!exists) {
    if (!createFolder(projctRootPath)) {
      console.log('Failed to create folder');
    }
  }
  
  const result = {
    exist: exists,
    projctRootPath: projctRootPath
  };

  return result;
}

module.exports = {
  myLogic
};