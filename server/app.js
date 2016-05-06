/**
 * Created by anuraagbasu on 28/04/16.
 */

var http = require("http");
var express = require("express");
var mongoose = require('mongoose');
var config = require("./config/environment");

mongoose.connect(config.mongo.uri, config.mongo.options);

if (config.seedDB) {
    require('./config/seed');
}

var app = express();

var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d', config.port);
});