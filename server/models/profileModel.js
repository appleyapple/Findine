var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// profile ID
// first name
// last name
// userName
// partnerName = partner's userName
// ready Boolean
// preferences = list of restaurants
// likedRestaurants = list of restaurants

profileModelSchema = new Schema({
    _profileID: Schema.Types.ObjectId,
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    userName: { type: String, required: true, maxlength: 50 },
    partnerName: { type: String, required: true, maxlength: 50 },
    ready: { type: Boolean, default: false, required: true },
    likedRestaurants: [{ type: String}],
    test: [{ type: String}],
    preferences: {
        prices: [{type: String}],
        cuisines: [{type: String}],
        ratings: [{type: String}],
        tags: [{type: String}],
    }
});

module.exports = mongoose.model('profileModel', profileModelSchema, 'profiles');

