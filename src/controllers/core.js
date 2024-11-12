const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

async function myLogic(projData) {

  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const projctRootPath = path.join("C:\\Users\\Willian\\Documents\\", projctRoot);

  var exists = folderExists(projctRootPath);

  if (exists) {
    console.log('Folder exists');
  } else {
    console.log('Folder does not exist');
    if (createFolder(projctRootPath)) {
      exists = true;
      console.log('Folder created');
    } else {
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