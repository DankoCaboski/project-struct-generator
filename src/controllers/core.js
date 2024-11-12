const { folderExists } = require('../services/folderService.js');

async function myLogic(projData) {
  const exists = folderExists(projData);
  console.log(exists);
  return exists;
}

module.exports = {
  myLogic
};