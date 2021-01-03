const Restaurants = require('../models/restaurantModel');

// display list of restaurants with parameters from form
exports.restaurant_form = function(req, res, next) {
    // https://expressjs.com/en/api.html#req.query
    var cuisine = req.query.cuisine;
    var price = req.query.price;
    var trim = req.query.trim;

    // if no price is specified
    if (!price) {
        price = [1, 2, 3, 4];
    } 

    if (!trim) {
        trim = 0;
    }

    // if no cuisine is specified
    if (!cuisine) {
        Restaurants
        .find({ 
            price: { $in: price }
        }, { name:1, cuisine:1, price:1, rating:1, highlights:1, img:1, _id:0 })
        .exec(function (err, listRestaurants) {
            if (err) {return next(err); }
            
            // sort by rating
            listRestaurants.sort((a,b) => (a.rating < b.rating) ? 1 : -1);

            // trim if specified
            if (trim) {
                listRestaurants = listRestaurants.slice(0, trim);
            }

            res.send(listRestaurants)
        });
    }
    
    // if cuisine and price are specified
    else {
        Restaurants
        .find({ 
            cuisine: { $in: cuisine }, // searches for all cuisines listed in cuisine array
            price: { $in: price }
        }, { name:1, cuisine:1, price:1, rating:1, highlights:1, img:1, _id:0 })
        .exec(function (err, listRestaurants) {
            if (err) {return next(err); }
            
            // sort by rating
            listRestaurants.sort((a,b) => (a.rating < b.rating) ? 1 : -1);

            // trim if specified
            if (trim) {
                listRestaurants = listRestaurants.slice(0, trim);
            }

            res.send(listRestaurants)
        });
    }
};

// display list of restaurants with body
exports.restaurant_body = function(req, res, next) {
    var cuisines = req.body.cuisines;
    var price = req.body.price.map(Number);
    var tags = req.body.tags;
    var trim = req.body.trim;
    console.log(JSON.stringify(req.body));

    if (!trim) {
        trim = 0;
    }

    // if no cuisine is specified
    if (!cuisines) {
        Restaurants
        .find({ 
            price: { $in: price },
            highlights: { $in: tags }
        }, { name:1, cuisine:1, price:1, rating:1, highlights:1, img:1, _id:0 })
        .exec(function (err, listRestaurants) {
            if (err) {return next(err); }
            
            // sort by rating
            listRestaurants.sort((a,b) => (a.rating < b.rating) ? 1 : -1);

            // trim if specified
            if (trim) {
                listRestaurants = listRestaurants.slice(0, trim);
            }

            res.send(listRestaurants)
        });
    }

    // if cuisine and price are specified
    else {
        Restaurants
        .find({ 
            cuisine: { $in: cuisines }, // searches for all cuisines listed in cuisine array
            price: { $in: price },
            highlights: { $in: tags }
        }, { name:1, cuisine:1, price:1, rating:1, highlights:1, img:1, _id:0 })
        .exec(function (err, listRestaurants) {
            if (err) {return next(err); }
            
            // sort by rating
            listRestaurants.sort((a,b) => (a.rating < b.rating) ? 1 : -1);

            // trim if specified
            if (trim) {
                listRestaurants = listRestaurants.slice(0, trim);
            }

            res.send(listRestaurants)
        });
    }
};

exports.getRestaurantById = function(req, res, next) {
    var restId = req.query._id;

    Restaurants.findOne(
        { _id : ObjectId(restId)})
        .exec(function (err, returnRestList) {
            if (err) {return next(err); }
            res.send(returnRestList);
        });
};

exports.getRestaurantByName = function(req, res, next) {
    var restName = req.body.name;

    Restaurants.findOne(
        { name : restName})
        .exec(function (err, returnRestList) {
            if (err) {return next(err); }
            res.send(returnRestList);
        });
};

exports.getCuisines = function(req, res, next) {

    Restaurants.distinct('cuisine')
        .exec(function (err, returnCuisineList) {
            if (err) {return next(err); }
            res.send(returnCuisineList);
        });
};
