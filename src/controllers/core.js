const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

async function myLogic(projData) {

  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const projctRootPath = path.join("C:\\Users\\Willian\\Documents\\", projctRoot);

  const exists = folderExists(projctRootPath);

  if (exists) {
    console.log('Folder exists');
  } else {
    console.log('Folder does not exist');
    if (createFolder(projctRootPath)) {
      console.log('Folder created');
    } else {
      console.log('Failed to create folder');
    }
  }
  return exists;
}

module.exports = {
  myLogic
};