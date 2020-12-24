const forum = require('../models/forumModel');


exports.getForum = function(req, res, next) {
    var restaurantName = req.body.restaurantName;

    forum.findOne(
        { "restaurantName" : restaurantName})
        .exec(function (err, returnForum) {
            if (err) {return next(err); }
            res.send(returnForum);
        });
};

exports.addForum = function(req, res, next) {
    var forumDetail = {
        restaurantName: req.body.restaurantName,
        comments: []
    };

    forum.updateOne(
        { restaurantName: forumDetail.restaurantName },
        forumDetail,
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.getRestaurantComments = function(req, res, next) {
    var restaurantName = req.body.restaurantName;

    forum.findOne(
        { "restaurantName" : restaurantName}, "comments")
        .exec(function (err, returnCommentList) {
            if (err) {return next(err); }
            res.send(returnCommentList);
        });
};

exports.addRestaurantComments = function(req, res, next) {
    var restaurantName = req.body.restaurantName;
    var comments = req.body.comments;

    forum.updateOne(
        { restaurantName: restaurantName},
        {"comments": comments},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.clearRestaurantComments = function(req, res, next) {
    var restaurantName = req.body.restaurantName;

    forum.updateOne(
        { restaurantName: restaurantName},
        { $set: {"comments": ""}},

        (err) => {
            if (err) return console.log(err);
        }
    );
};