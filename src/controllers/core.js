const { folderExists } = require('../services/folderService.js');

function myLogic() {
  return folderExists();
}

module.exports = {
  myLogic
};
