const matches = require('../models/matchModel');

exports.getMatch = function(req, res, next) {
    var user1Name = req.query.user1Name;

    matches.findOne(
        { "user1Name" : user1Name})
        .exec(function (err, returnMatch) {
            if (err) {return next(err); }
            res.send(returnMatch);
        });
};

exports.addMatch = function(req, res, next) {
    var matchDetail = {
        user1Name: req.body.user1Name,
        user2Name: req.body.user2Name,
        
        matchedRestaurants: []
    };

    matches.updateOne(
        { user1Name: matchDetail.user1Name },
        matchDetail,
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.getMatchedRestaurants= function(req, res, next) {
    var user1Name = req.query.user1Name;

    matches.findOne(
        { "user1Name" : user1Name}, "matchedRestaurants")
        .exec(function (err, returnMatchedRestList) {
            if (err) {return next(err); }
            res.send(returnMatchedRestList);
        });
};

exports.addMatchedRestaurants= function(req, res, next) {
    var user1Name = req.body.user1Name;
    var restaurant = req.body.matchedRestaurants;

    matches.updateOne(
        { user1Name: user1Name},
        {"matchedRestaurants": restaurant},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.clearMatchedRestaurants= function(req, res, next) {
    var user1Name = req.query.user1Name;

    matches.updateOne(
        { user1Name: user1Name},
        { $set: {"matchedRestaurants": ""}},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.getPartnerName = function (req, res, next) {
    var user1Name = req.query.user1Name;

    matches.findOne(
        { "user1Name" : user1Name}, "user2Name")
        .exec(function (err, returnPartnerName) {
            if (err) {return next(err); }
            res.send(returnPartnerName);
        });
};

exports.setPartnerName = function (req, res, next) {
    var user1Name = req.query.user1Name;
    var user2Name = req.query.user2Name;

    matches.updateOne(
        { user1Name: user1Name},
        { $set: {"user2Name": user2Name}},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.deleteMatch = function (req, res, next) {
    var user1Name = req.query.user1Name;

    matches.deleteOne(
        { "user1Name": user1Name },
        (err) => {
            if (err) return console.log(err);
        }
    );
};
