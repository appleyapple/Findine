const fetch = require('node-fetch');
const mongoose = require('mongoose');
const db = require('./models/db');
const restaurantModel = require('./models/restaurantModel')
// const cuisineModel = require('./models/cuisineModel')

// set zomato api key as header:347018b44ec604110b8f227cb21fd6dc
// robson st. coordinates 49.287968050315634, -123.13003220889654
// max query results is 20
const url = 'https://developers.zomato.com/api/v2.1/search?start=';
const search = 'q=breakfast%2C%20lunch%2C%20dinner&start=0&lat=49.287968050315634&lon=-123.13003220889654&radius=1000&sort=rating&order=desc';
const defaultImg = 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

function restaurantCreate(name, cuisine, price, rating, highlights, img) {

    restaurantDetail = {
        name: name,
        cuisine: cuisine,
        price: price,
        rating: rating,
        highlights: highlights,
        img: img
    };

    restaurantModel.updateOne(
        { name: restaurantDetail.name },
        restaurantDetail,
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};

// name: { type: String, required: true, maxlength: 50 },
// cuisine: [{ type: String, required: true, maxlength: 256 }],
// price: { type: Number, min: 1, max: 4, required: true },
// rating: { type: Number, min: 0, max: 5, required: true },
// highlights: [{ type: String, required: false, maxlength: 256 }],
// img: { type: String, required: false, maxlength: 256 }

// connect to db
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('Database connection successful');

console.log('Populating database restaurant collection...');

// get restaurants with zomato api as json
restaurants = [];

for (var offset = 0; offset<200; offset+=20) {

    var newURL = url.concat(toString(offset), search);

    fetch(newURL, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'user-key': '347018b44ec604110b8f227cb21fd6dc'
        }
    })
    .then(response => response.json())
    
    // store restaurant info into restaurants[]
    .then(data => {
        for (var i=0; i<data.restaurants.length; i++) {
            // create restaurant objects
            console.log(data.restaurants[i].restaurant.name);
            console.log(data.restaurants[i].restaurant.featured_image);
            // if (!data.restaurants[i].restaurant.featured_image) {
            //     data.restaurants[i].restaurant.featured_image = defaultImg;
            //     console.log(data.restaurants[i].restaurant.featured_image);
            // }
            restaurantCreate(
                data.restaurants[i].restaurant.name,
                data.restaurants[i].restaurant.cuisines.split(', '),
                parseFloat(data.restaurants[i].restaurant.price_range),
                parseFloat(data.restaurants[i].restaurant.user_rating.aggregate_rating),
                data.restaurants[i].restaurant.highlights,
                data.restaurants[i].restaurant.featured_image
            )
        }
    })
    .catch(error => {
        console.log(error);
    });
}






