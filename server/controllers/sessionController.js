const session = require('../models/sessionModel');

exports.getSession = function(req, res, next) {

    session.findOne(
        { status : "online"}, "userName")
        .exec(function (err, returnSessionUser) {
            if (err) {return next(err); }
            res.send(returnSessionUser);
        });
};

exports.setSession = function(req, res, next) {
    var userName = req.body.userName;

    session.updateOne(
        { status: "online"},
        { $set: {"userName": userName}},
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};

exports.clearSession = function(req, res, next) {
    session.updateOne(
        { status: "online"},
        { $set: {"userName": ""}},
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
        }
    );
};