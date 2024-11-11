const fs = require('fs');
const path = require('path');

function folderExists(folderPath) {
  return fs.existsSync(path.resolve("C:\\Users\\Willian\\Documents\\02 - GitHub"));
}

module.exports = {
  folderExists
};