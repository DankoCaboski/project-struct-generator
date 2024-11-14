const { folderExists, createFolder } = require('../services/folderService.js');
const path = require('path');

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

  const leafs = require("..\\properties\\config.json").leaves.desiredLeaves;

  leafs.forEach(leaf => {
    const leafPath = path.join(projctRootPath, leaf.name);
    createFolder(leafPath);
  });
}

module.exports = {
  generateProject
};