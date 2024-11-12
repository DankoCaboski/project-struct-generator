const { folderExists } = require('../services/folderService.js');

async function myLogic(arg) {
  const exists = await folderExists(arg);
  console.log(exists);
}

module.exports = {
  myLogic
};
