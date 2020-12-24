var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// match ID
// user 1 userName
// user 2 userName
// likedRestaurants = list of matching restaurants

matchModelSchema = new Schema({
    _matchID: Schema.Types.ObjectId,
    user1Name: { type: String, required: true, maxlength: 50 },
    user2Name: { type: String, required: true, maxlength: 50 },
    matchedRestaurants: [{ type: String}]
});

module.exports = mongoose.model('matchModel', matchModelSchema, 'matches');

