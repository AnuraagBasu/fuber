/**
 * Created by anuraagbasu on 30/04/16.
 */

var CarService = require("./car.service");

function register (req, res) {
    CarService.register(req.body.licensePlate, req.body.driver, req.body.isPink, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(resp);
    });
}

function activate (req, res) {
    CarService.activate(req.body.licensePlate, req.body.location, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(true);
    });
}

function deactivate (req, res) {
    CarService.deactivate(req.body.licensePlate, function (err, resp) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(true);
    });
}

function all (req, res) {
    CarService.getAll(function (err, cars) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(cars);
    });
}

function getCar (req, res) {
    CarService.getCar(req.query.carId, function (err, car) {
        if (err) {
            return handleError(res, err);
        }

        return res.status(200).send(car);
    });
}

function handleError (res, err) {
    res.status(500).send(false);
}

module.exports = {
    "register": register,
    "activate": activate,
    "deactivate": deactivate,
    "all": all,
    "getCar": getCar
};