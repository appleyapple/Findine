var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// account ID (profile userName)
// password

accountModelSchema = new Schema({
  _accountID: Schema.Types.String,
  password: { type: String, required: true, maxlength: 50 }
})

module.exports = mongoose.model('accountModel', accountModelSchema, 'account');
