/**
 * Created by anuraagbasu on 28/04/16.
 */

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function (app) {
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(errorHandler());
};