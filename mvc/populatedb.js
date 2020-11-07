#! /usr/bin/env node

// CREDITS: https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js
console.log('This script populates some test restaurants and cuisines to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var restaurantModel = require('./models/restaurantModel')
var cuisineModel = require('./models/cuisineModel')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var restaurants = []
var cuisines = []

function restaurantCreate(name, cuisine, price, rating, cb) {
    restaurantDetail = {
        name: name,
        price: price,
        rating: rating
    };
    if (cuisine != false) restaurantDetail.cuisine = cuisine;

    var restaurant = new restaurantModel(restaurantDetail);
    restaurant.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New restaurant: ' + restaurant);
        restaurants.push(restaurant);
        cb(null, restaurant);
    });
}

function cuisineCreate(name, cb) {
    var cuisine = new cuisineModel({ name: name });

    cuisine.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New cuisine: ' + cuisine);
        cuisines.push(cuisine);
        cb(null, cuisine);
    });
}

function createRestarantsCuisines(cb) {
    async.series([
        function (callback) {
            cuisineCreate('fast', callback)
        },
        function (callback) {
            cuisineCreate('japanese', callback)
        },
        function (callback) {
            cuisineCreate('sushi', callback)
        },
        function(callback) {
            restaurantCreate('McDonalds', cuisines[0], 1, 3.4, callback)
        },
        function(callback) {
            restaurantCreate('Ramen DANBO', cuisines[1], 3, 4.6, callback)
        },
        function (callback) {
            restaurantCreate('Miku Vancouver', cuisines[2], 2, 4.4, callback)
        }
    ]);
}

async.series([
    createRestarantsCuisines,
], 
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Restaurants: '+ restaurants);   
    }
    // All done, disconnect from database
    mongoose.connection.close();
});





