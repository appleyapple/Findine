var mongoose = require('mongoose');

var Schema = mongoose.Schema;

restaurantModelSchema = new Schema({
    _restaurantID: Schema.Types.ObjectId,
    name: { type: String, required: true, maxlength: 50 },
    // cuisine: [{ type: Schema.Types.ObjectId, ref: 'Cuisine', required: true }], // reference to associated cuisine
    cuisine: [{ type: String, required: true, maxlength: 50 }],
    // lat: { type: Decimal128, min: -90, max: 90, required: true },
    // lon: { type: Number, min: -180, max: 180, required: true },
    price: { type: Number, min: 1, max: 3, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    // hours: Boolean
})

// virtual for restaurant's URL
restaurantModelSchema
.virtual('url')
.get(function () {
    return '/catalog/restaurants' + this._id;
});

// export model
module.exports = mongoose.model('restaurantModel', restaurantModelSchema);


// // using models in other files
// //Create a SomeModel model just by requiring the module
// var SomeModel = require('../models/somemodel')

// // Use the SomeModel object (model) to find all SomeModel records
// SomeModel.find(callback_function);


// Create an instance of model SomeModel
// var awesome_instance = new SomeModel({ name: 'awesome' });

// // Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

// // Access model field values using dot notation
// console.log(awesome_instance.name); //should log 'also_awesome'

// // Change record by modifying the fields, then calling save().
// awesome_instance.name="New cool name";
// awesome_instance.save(function (err) {
//    if (err) return handleError(err); // saved!
// });

// // find all athletes who play tennis, selecting the 'name' and 'age' fields
// Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
//     if (err) return handleError(err);
//     // 'athletes' contains the list of athletes that match the criteria.
//   })

// // building and executing a query
// // find all athletes that play tennis
// var query = Athlete.find({ 'sport': 'Tennis' });

// // selecting the 'name' and 'age' fields
// query.select('name age');

// // limit our results to 5 items
// query.limit(5);

// // sort by age
// query.sort({ age: -1 });

// // execute the query at a later time
// query.exec(function (err, athletes) {
//   if (err) return handleError(err);
//   // athletes contains an ordered list of 5 athletes who play Tennis
// })


// // same as above with dot notation
// Athlete.
//   find().
//   where('sport').equals('Tennis').
//   where('age').gt(17).lt(50).  //Additional where query
//   limit(5).
//   sort({ age: -1 }).
//   select('name age').
//   exec(callback); // where callback is the name of our callback function.