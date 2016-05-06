/**
 * Created by anuraagbasu on 30/04/16.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CarSchema = new Schema({
    licensePlate: {type: String, unique: true},
    driver: {
        name: String,
        address: String
    },
    active: {type: Boolean, default: false},
    onRide: {type: Boolean, default: false},
    location: {
        name: String,
        coordinates: {type: [Number], index: '2d'}
    },
    isPink: Boolean
});

module.exports = mongoose.model("Car", CarSchema);