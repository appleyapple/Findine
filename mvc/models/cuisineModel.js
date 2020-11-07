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

// compile model from schema
// var cuisineModel = mongoose.model('cuisineModel', cuisineModelSchema);
// export model
module.exports = mongoose.model('cuisineModel', cuisineModelSchema);