var mongoose = require('mongoose');

var Schema = mongoose.Schema;

cuisineModelSchema = new Schema({
    name: { type: String, required: true, maxlength: 20 },
})

// virtual for cuisine's URL
cuisineModelSchema
.virtual('url')
.get(function () {
    return '/catalog/cuisine' + this._id;
});

// export model
module.exports = mongoose.model('cuisineModel', cuisineModelSchema);