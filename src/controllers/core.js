const SMB2 = require('smb2');
const { folderExists, createFolder, importDocs } = require('../services/folderService.js');
const path = require('path');

async function generateProject(projData) {
  try {
    const projctRoot = projData.projectNumber + " - " + projData.projectName;
    const basePath = require("..\\properties\\config.json").branchPath.whereToCreate;
  
    const smb2Client = new SMB2({ 
      share: basePath,
      username: 'AXIS-SERVER',
      password: '12345678'
    });
  
    const projctRootPath = path.join(basePath, projctRoot);
  
    return generateBranchFolder(smb2Client, projctRootPath);
  }
  catch (err) {
    const errorDetails = {
      error: true,
      message: err.message,
      stack: err.stack,
      projData: projData
    };
    console.error(err);
    return errorDetails;
  }
}

async function generateBranchFolder(smb2Client, projctRootPath) {
  
  var exists = folderExists(smb2Client, projctRootPath);
  var fault = false;

  if (!exists) {
    if (!createFolder(smb2Client, projctRootPath)) {
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

  const leaves = require("..\\properties\\config.json").leaves.desiredLeaves;

  leaves.forEach(leaf => {
    const leafPath = path.join(projctRootPath, leaf.name);
    leaf = createFolder(leafPath);

    // if (leaf.innerDocs.length > 0) {
    //   importDocs(leafPath);
    // }

    // desiredLeaves

  });
}

module.exports = {
  generateProject
};