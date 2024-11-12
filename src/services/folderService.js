const fs = require('node:fs');

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

module.exports = {
  folderExists,
  createFolder
};