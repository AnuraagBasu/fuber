/**
 * Created by anuraagbasu on 30/04/16.
 */

var Car = require("./car.model");

function register (licensePlate, driver, isPink, callback) {
    new Car({
        licensePlate: licensePlate,
        driver: driver,
        isPink: isPink
    }).save(function (err, resp) {
            if (err) {
                console.log("Error occurred while registering car");
                console.log(err);
            }

            return callback(err, resp);
        });
}

function activate (licensePlate, location, callback) {
    Car.findOneAndUpdate({licensePlate: licensePlate},
                        {$set: {active: true, "location.coordinates": location.coordinates.split(',').map(Number),
                                "location.name": location.name}}, function (err, resp) {
        if (err) {
            console.log("Error occurred while activating car");
            console.log(err);
        }

        return callback(err, resp);
    })
}

function deactivate (licensePlate, callback) {
    Car.findOneAndUpdate({licensePlate: licensePlate}, {$set: {active: false}}, function (err, resp) {
        if (err) {
            console.log("Error occurred while de-activating car");
            console.log(err);
        }

        return callback(err, resp);
    });
}

function markOnRide (carId, onRide, callback) {
    Car.findOneAndUpdate({_id: carId}, {$set: {onRide: onRide}}, function (err, resp) {
        if (err) {
            console.log("Error occurred while marking car's onRide");
            console.log(err);
        }

        return callback(err, resp);
    });
}

function findNearest (pickUpLocation, hasToBePink, nearestWithin, callback) {
    nearestWithin /= 6371;

    var criteria = {
        active: true,
        onRide: false,
        "location.coordinates": {
            $near: pickUpLocation,
            $maxDistance: nearestWithin
        }
    };

    if (hasToBePink) {
        criteria.isPink = true;
    }

    Car.find(criteria, {_id: 1}).limit(1).lean().exec(function (err, resp) {
        if (err) {
            console.log("Error finding nearest car");
            console.log(err);

            return callback(new Error("Error finding nearest car"));
        }

        if (resp && resp.length) {
            markOnRide(resp[0]._id, true, function (error, car) {
                return callback(error, car);
            });
        } else {
            return callback(null, null);
        }
    });
}

function endTripForCar (carId, dropCoordinates, dropLocationName, callback) {
    Car.findOneAndUpdate({_id: carId}, {$set: {onRide: false, "location.coordinates": dropCoordinates, "location.name": dropLocationName}}, function (err, resp) {
        if (err) {
            console.log("Error in ending trip for car");
            console.log(err);
        }

        return callback(err, resp);
    });
}

function getAll (callback) {
    Car.find({}, function (err, cars) {
        if (err) {
            console.log("Error in getting all cars");
            console.log(err);
        }

        return callback(err, cars);
    });
}

function getCar (carId, callback) {
    Car.findOne({_id: carId}, function (err, car) {
        if (err) {
            console.log("Error in getting car details");
            console.log(car);
        }

        return callback(err, car);
    });
}

module.exports = {
    "register": register,
    "activate": activate,
    "deactivate": deactivate,
    "markOnRide": markOnRide,
    "findNearest": findNearest,
    "endTripForCar": endTripForCar,
    "getAll": getAll,
    "getCar": getCar
};