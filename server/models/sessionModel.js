var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// session ID
// user in use

sessionModelSchema = new Schema({
    _sessionID: Schema.Types.ObjectId,
    userName: { type: String, required: true, maxlength: 50 },
    status: { type: String, required: true, maxlength: 50 }
});

module.exports = mongoose.model('sessionModel', sessionModelSchema, 'sessions');

