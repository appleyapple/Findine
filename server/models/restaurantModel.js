var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// name
// delivery/takeaway
// cuisines
// price_range
// average_cost_for_two
// user_rating: aggregate_rating
// highlights
// featured_image

restaurantModelSchema = new Schema({
    _restaurantID: Schema.Types.ObjectId,
    name: { type: String, required: true, maxlength: 50 },
    cuisine: [{ type: String, required: true, maxlength: 256 }],
    price: { type: Number, min: 1, max: 4, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    highlights: [{ type: String, required: false, maxlength: 256 }],
    img: { type: String, required: false, maxlength: 256 }
})

module.exports = mongoose.model('restaurantModel', restaurantModelSchema, 'restaurants');

