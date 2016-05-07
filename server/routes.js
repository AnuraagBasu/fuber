/**
 * Created by anuraagbasu on 28/04/16.
 */

var express = require("express");
var config = require("./config/environment");

module.exports = function (app) {

    app.use('/v1/car', require('./api/car'));

    app.use('/v1/user', require('./api/user'));

    app.use('/v1/ride', require('./api/ride'));

    app.use("/bower_components/angular-resource")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + "/bower_components/angular-resource/angular-resource.js")
        });

    app.use("/bower_components/angular-cookies")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + "/bower_components/angular-cookies/angular-cookies.js")
        });

    app.use("/bower_components/angular-sanitize")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + "/bower_components/angular-sanitize/angular-sanitize.js")
        });

    app.use("/bower_components/lodash")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + "/bower_components/lodash/dist/lodash.min.js")
        });

    app.route("/(:url(user|car|ride))?")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};