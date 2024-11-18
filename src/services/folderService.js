const fs = require('node:fs');
const SMB2 = require('smb2');
const path = require('path');

function folderExists(smb2Client, projctRootPath) {

  try {
    smb2Client.exists(projctRootPath, function (exists) {
      return exists;
    });
  } catch (err) {
    console.error(err);
  }
}

function createFolder(smb2Client, projctRootPath) {
  try {
    smb2Client.createDirectory(projctRootPath, function (err) {
      if (err) {
        console.error(err);
        return false;
      }
    });
    // fs.mkdirSync(projctRootPath);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function importDocs(leafPath){
  const docsPath = require("..\\properties\\config.json").leaves.from;

  const docs = fs.readdirSync(docsPath);
  
  docs.forEach(doc => {
    const docPath = path.join(docsPath, doc);
    const destPath = path.join(leafPath, doc);
    fs.copyFileSync(docPath, destPath);
  });
}

module.exports = {
  folderExists,
  createFolder,
  importDocs
};