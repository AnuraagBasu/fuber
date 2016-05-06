/**
 * Created by anuraagbasu on 30/04/16.
 */

var User = require("./user.model");

function login (userName, userPhone, callback) {
    new User({
        name: userName,
        phone: userPhone
    }).save(function (err, resp) {
            if (!err) {
                console.log("Error while registering user");
                console.log(err);
            }

            return callback(err, resp);
        });
}

function getAll (callback) {
    User.find({}).lean().exec(function (err, users) {
        if (err) {
            console.log("Error in getting all users");
            console.log(err);
        }

        return callback(err, users);
    })
}

function getUser (userId, callback) {
    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            console.log("Error in finding user");
            console.log(err);
        }

        return callback(err, user);
    });
}

module.exports = {
    "login": login,
    "getAll": getAll,
    "getUser": getUser
};