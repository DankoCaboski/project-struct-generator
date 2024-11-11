const { folderExists } = require('../services/folderService.js');

function myLogic() {
  console.log(folderExists());
}

module.exports = {
  myLogic
};
