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
    if (projctRootPath.includes("08 - Relatorios e Manuais")) {
      importDocs(projctRootPath); 
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function importDocs(projctRootPath){
  const docsPath = require("..\\properties\\config.json").leafPath.from;

  const docs = fs.readdirSync(docsPath);
  docs.forEach(doc => {
    const docPath = path.join(docsPath, doc);
    const destPath = path.join(projctRootPath, doc);
    fs.copyFileSync(docPath, destPath);
  });
}

module.exports = {
  folderExists,
  createFolder
};