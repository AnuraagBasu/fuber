/**
 * Created by anuraagbasu on 03/05/16.
 */

var User = require("../api/user/user.model");
var Car = require("../api/car/car.model");
var async = require("async");

User.count({}, function (err, count) {
    if (!count) {
        var users = [
            new User({
               "name": "Fred",
                "phone": 12345
            }),
            new User({
                "name": "Barney",
                "phone": 23456
            }),
            new User({
                "name": "Wilma",
                "phone": 34567
            }),
            new User({
                "name": "Mr. Slate",
                "phone": 67890
            })
        ];

        var tasks = [];
        users.forEach(function (user) {
            tasks.push(function (innerCallback) {
                user.save(function (err, resp) {
                    console.log(user.name, " : User created!!");
                    innerCallback(err, resp)
                });
            });
        });
        async.parallel(tasks, function (err, resp) {
            var cars = [
                new Car({
                    licensePlate: "KA 04 9870",
                    driver: {
                        name: "Driver 1",
                        address: ""
                    },
                    isPink: false,
                    location : {
                        "name": "ITPL",
                        "coordinates": [
                            77.742461,
                            12.987049
                        ]
                    },
                    active: true
                }),
                new Car({
                    licensePlate: "KA 14 2256",
                    driver: {
                        name: "Driver 2",
                        address: ""
                    },
                    isPink: true,
                    location: {
                        "name" : "Brigade Road",
                        "coordinates" : [
                            77.606920,
                            12.971373
                        ]
                    },
                    active: true
                }),
                new Car({
                    licensePlate: "KA 01 3427",
                    driver: {
                        name: "Driver 3",
                        address: ""
                    },
                    isPink: false,
                    location: {
                        "name": "Domlur Bridge",
                        "coordinates": [
                            77.641386,
                            12.958476
                        ]
                    },
                    active: true
                })
            ];

            var carTasks = [];
            cars.forEach(function (car) {
                carTasks.push(function (innerCallback) {
                    car.save(function (err, resp) {
                        console.log(car.licensePlate, " : Car Created");
                        innerCallback(err, resp);
                    })
                });
            });

            async.parallel(carTasks);
        });
    }
});