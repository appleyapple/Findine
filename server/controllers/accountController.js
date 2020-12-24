const accounts = require('../models/accountModel');


function attemptCreateAccount(req, res, next) {
  var accountDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password
  };
  console.log(accountDetails);
}

function attemptLoginAccount(req, res, next) {

}

module.exports = {
  attemptCreateAccount,
  attemptLoginAccount
}