const { folderExists } = require('../services/folderService.js');

function myLogic(arg) {
  console.log(folderExists(arg));
}

module.exports = {
  myLogic
};
