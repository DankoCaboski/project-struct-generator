const { folderExists } = require('../services/folderService.js');

async function myLogic(arg) {
  const exists = folderExists(arg);
  console.log(exists);
  return exists;
}

module.exports = {
  myLogic
};