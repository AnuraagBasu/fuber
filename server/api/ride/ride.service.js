/**
 * Created by anuraagbasu on 30/04/16.
 */

var RideEnum = require("../../enums/ride.enums");
var CarService = require("../car/car.service");
var Ride = require("./ride.model");

function bookRide (userId, pickUpLocation, hasToBePink, callback) {
    var pickUpCoordinates = pickUpLocation.coordinates.split(",").map(Number);
    CarService.findNearest(pickUpCoordinates, hasToBePink, RideEnum.maxRadius, function (errorInFindingCar, car) {
        if (errorInFindingCar) {
            return callback(errorInFindingCar, null);
        }

        if (car) {
            new Ride({
                userId: userId,
                carId: car._id,
                ongoing: true,
                inPinkCar: (hasToBePink==true),
                origin: {
                    coordinates: pickUpCoordinates,
                    name: pickUpLocation.name
                }
            }).save(function (errorInCreatingRide, ride) {
                    if (errorInCreatingRide) {
                        console.log("Error in creating ride");
                        console.log(errorInCreatingRide);
                        // TODO: reset/free car assigned to user and ask to try again
                    }

                    return callback(errorInCreatingRide, ride);
                });
        } else {
            console.log("No cars found");
            return callback(null, {});
        }
    });
}

function startRide (rideId, callback) {
    Ride.findOneAndUpdate({_id: rideId}, {$set: {rideStart: Date.now()}}, function (err, resp) {
        if (err) {
            console.log("Error in starting the ride");
            console.log(err);
        }

        return callback(err, resp);
    });
}

function endRide (rideId, location, callback) {
    Ride.findOne({_id: rideId}, {userId: 0}, function (errorInFindingRide, ride) {
        if (errorInFindingRide) {
            console.log("Error in ending ride");
            console.log(errorInFindingRide);

            return callback(errorInFindingRide);
        }

        var dropCoordinates = location.coordinates.split(",").map(Number);
        getDistanceCovered(ride.origin.coordinates, dropCoordinates, function (distanceTravelled) {
            var rideEndTime = Date.now();
            var rideDuration = rideEndTime - ride.startTime;

            getCostForRide(rideDuration, distanceTravelled, ride.inPinkCar, function (travelCostForRide) {
                ride.ongoing = false;
                ride.endTime = rideEndTime;
                ride.distanceCovered = distanceTravelled;
                ride.destination = {
                    "coordinates": dropCoordinates,
                    "name": location.name
                };
                ride.tripCost = travelCostForRide;
                ride.save(function (errorInEndingRide, resp) {
                    if (errorInEndingRide) {
                        console.log("Error in ending ride");
                        console.log(errorInEndingRide);

                        return callback(errorInEndingRide);
                    }

                    CarService.endTripForCar(resp.carId, dropCoordinates, location.name, function (errorInFreeingCar, car) {
                        if (errorInFreeingCar) {
                            console.log("Error in freeing car");
                            console.log(errorInFreeingCar);

                            //TODO: rollback - ride update

                            return callback(errorInFreeingCar);
                        }

                        return callback(null, resp);
                    });
                });
            });
        });
    });
}

function getDistanceCovered (pickUpLocation, dropLocation, callback) {
    var theta = pickUpLocation[0] - dropLocation[0];
    var pickUpLatInRadian = (pickUpLocation[1] * Math.PI / 180);
    var dropLatInRadian = (dropLocation[1] * Math.PI / 180);
    var thetaInRadian = (theta * Math.PI / 180);

    var distance = Math.sin(pickUpLatInRadian) * Math.sin(dropLatInRadian) + Math.cos(pickUpLatInRadian) * Math.cos(dropLatInRadian) * Math.cos(thetaInRadian);
    distance = Math.acos(distance);
    distance = (distance * 180 / Math.PI);
    distance = (distance * 60 * 1.1515) * 1.609344;

    return callback(distance.toFixed(2));
}

function getCostForRide (rideDuration, distanceTravelled, isPinkCar, callback) {
    var costForRideDuration = (rideDuration/(60*1000)) * RideEnum.costCalculation.costPerMinute;
    var costForDistanceTravelled = distanceTravelled*RideEnum.costCalculation.costPerKilometer;

    var totalCostForRide = costForRideDuration + costForDistanceTravelled;

    if (isPinkCar) {
        totalCostForRide += RideEnum.costCalculation.costForPinkCar;
    }

    return callback(Math.round(totalCostForRide));
}

function getAllRides (userId, carId, callback) {
    var criteria = {};
    if (userId) {
        criteria.userId = userId;
    }

    if (carId) {
        criteria.carId = carId;
    }

    Ride.find(criteria).sort({startTime: -1}).lean().exec(function (err, rides) {
        if (err) {
            console.log("Error in getting all rides");
            console.log(err);
        }

        return callback(err, rides);
    });
}

function getRide (rideId, callback) {
    Ride.findOne({_id: rideId}, function (err, ride) {
        if (err) {
            console.log("Error in fetching ride details");
            console.log(err);
        }

        return callback(err, ride);
    });
}

module.exports = {
    "book": bookRide,
    "start": startRide,
    "end": endRide,
    "getAllRides": getAllRides,
    "getRide": getRide
};