const fs = require('fs');
const path = require('path');

async function folderExists(folderPath) {
  try {
    await fs.access(path.resolve("C:\\Users\\Willian\\Documents\\", folderPath));
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  folderExists
};