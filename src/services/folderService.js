const fs = require('node:fs');
const path = require('path');

function folderExists(projctRootPath) {

  try {
    return fs.existsSync(projctRootPath);
  } catch (err) {
    console.error(err);
  }
}

function createFolder(projctRootPath) {
  try {
    fs.mkdirSync(projctRootPath);

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