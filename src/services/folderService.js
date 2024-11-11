const fs = require('fs');
const path = require('path');

function folderExists(folderPath) {
  return fs.existsSync(path.resolve("C:\\Users\\Willian\\Documents\\", folderPath));
}

module.exports = {
  folderExists
};