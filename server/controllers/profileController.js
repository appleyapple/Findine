const profiles = require('../models/profileModel');

exports.getProfile = function(req, res, next) {
    var userName = req.query.userName;

    profiles.findOne(
        { "userName" : userName})
        .exec(function (err, returnProfiles) {
            if (err) {return next(err); }
            res.send(returnProfiles);
        });
};

exports.addProfile = function(req, res, next) {
    var profileDetail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        partnerName: req.body.partnerName,
        ready: false,
        preferences: [],
        likedRestaurants: []
    };

    profiles.updateOne(
        { userName: profileDetail.userName },
        profileDetail,
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.updateProfileReady = function(req, res, next) {
    var userName = req.query.userName;
    var isReady = req.query.ready;

    profiles.updateOne(
        { userName: userName},
        { $set: {ready: isReady}},
        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.getProfileReady = function(req, res, next) {
    var userName = req.query.userName;

    profiles.findOne(
        { "userName" : userName}, "ready")
        .exec(function (err, returnProfileReady) {
            if (err) {return next(err); }
            res.send(returnProfileReady);
        });
};

exports.getLikeRestaurants= function(req, res, next) {
    var userName = req.query.userName;

    profiles.findOne(
        { "userName" : userName}, "likedRestaurants")
        .exec(function (err, returnProfileRestList) {
            if (err) {return next(err); }
            res.send(returnProfileRestList);
        });
};

exports.addLikeRestaurants= function(req, res, next) {
    var userName = req.body.userName;
    var restaurant = req.body.likedRestaurants;
    // console.log(userName);
    // console.log(restaurant);

    profiles.updateOne(
        { userName: userName},
        {"likedRestaurants": restaurant},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.clearLikeRestaurants= function(req, res, next) {
    var userName = req.query.userName;

    profiles.updateOne(
        { userName: userName},
        { $set: {"likedRestaurants": ""}},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.getPartnerName = function (req, res, next) {
    var userName = req.query.userName;

    profiles.findOne(
        { "userName" : userName}, "partnerName")
        .exec(function (err, returnPartnerName) {
            if (err) {return next(err); }
            res.send(returnPartnerName);
        });
};

exports.getPreferences= function(req, res, next) {
    var userName = req.query.userName;

    profiles.findOne(
        { "userName" : userName}, "preferences")
        .exec(function (err, returnPreferences) {
            if (err) {return next(err); }
            res.send(returnPreferences);
        });
};

exports.addPreferences= function(req, res, next) {
    var userName = req.body.userName;
    var preferences = req.body.preferences;

    profiles.updateOne(
        { userName: userName},
        {"preferences": preferences},

        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.clearPreferences= function(req, res, next) {
    var userName = req.query.userName;

    profiles.updateOne(
        { userName: userName},
        { $set: {"preferences": ""}},

        (err) => {
            if (err) return console.log(err);
        }
    );
};