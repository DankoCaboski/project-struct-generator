const fs = require('node:fs');
const path = require('path');

function folderExists(projData) {

  const projctRoot = projData.projectNumber + " - " + projData.projectName;
  const projctRootPath = path.join("C:\\Users\\Willian\\Documents\\", projctRoot);

  try {
    return fs.existsSync(projctRootPath);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  folderExists
};