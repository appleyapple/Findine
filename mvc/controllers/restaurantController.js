const { nextTick } = require('async');
var Restaurants = require('../models/restaurantModel');

// display webpage
exports.index = function(req, res) {
    res.send('TODO: webpage');
}

// display list of restaurants
exports.restaurant_list = function(req, res, next) {

    Restaurants
        .find({}, 'name cuisine price rating')
        .exec(function (err, listRestaurants) {
            if (err) {return next(err); }
            // Successful
            res.send(listRestaurants)
        });

    // res.send('TODO: restaurant list');
}

// // display list of restaurants with parameters
// exports.restaurant_list = function(req, res) {
//     res.send('TODO: restaurant list with parameters');
// }

// // display specific restaurant
// exports.restaurant_list = function(req, res) {
//     res.send('TODO: restaurant');
// }

