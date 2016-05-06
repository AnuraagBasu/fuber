/**
 * Created by anuraagbasu on 30/04/16.
 */

var UserService = require("./user.service");

function login (req, res) {
    UserService.login(req.body.userName, req.body.phone, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(resp);
    });
}

function all (req, res) {
    UserService.getAll(function (err, users) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(users);
    });
}

function getUser (req, res) {
    UserService.getUser(req.query.userId, function (err, user) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(user);
    });
}

function handleError (res, err) {
    res.status(500).send(false);
}

module.exports = {
    "login": login,
    "all": all,
    "getUser": getUser
};