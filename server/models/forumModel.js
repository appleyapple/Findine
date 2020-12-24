var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// forum ID
// restaurant name
// comments list

forumModelSchema = new Schema({
    _forumID: Schema.Types.ObjectId,
    restaurantName: { type: String, required: true, maxlength: 50 },
    comments: [{ type: String}]
});

module.exports = mongoose.model('forumModel', forumModelSchema, 'forums');

