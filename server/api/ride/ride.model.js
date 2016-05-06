/**
 * Created by anuraagbasu on 30/04/16.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var RideSchema = new Schema({
    userId: {type: String, required: true},
    carId: {type: String, required: true},
    ongoing: {type: Boolean, default: false},
    startTime: {type: Number, default: Date.now},
    endTime: Number,
    inPinkCar: Boolean,
    distanceCovered: {type: Number, default: 0},
    origin: {
        name: String,
        coordinates: {type: [Number], index: '2dsphere'}
    },
    destination: {
        name: String,
        coordinates: {type: [Number], index: '2dsphere'}
    },
    tripCost: Number
});

RideSchema.index({userId: 1});
RideSchema.index({carId: 1});

module.exports = mongoose.model("Ride", RideSchema);