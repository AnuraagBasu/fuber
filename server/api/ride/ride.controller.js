/**
 * Created by anuraagbasu on 30/04/16.
 */

var RideService = require("./ride.service");

function all (req, res) {
    RideService.getAllRides(req.query.userId, req.query.carId, function (err, rides) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(rides);
    });
}

function book (req, res) {
    RideService.book(req.body.userId, req.body.pickUpLocation, req.body.hasToBePink, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(resp);
    });
}

function start (req, res) {
    RideService.start(req.body.rideId, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(true);
    });
}

function end (req, res) {
    RideService.end(req.body.rideId, req.body.location, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(resp);
    });
}

function getRide (req, res) {
    RideService.getRide(req.query.rideId, function (err, ride) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(ride);
    });
}

function handleError (res, err) {
    res.status(500).send(false);
}

module.exports = {
    "book": book,
    "start": start,
    "end": end,
    "all": all,
    "getRide": getRide
};