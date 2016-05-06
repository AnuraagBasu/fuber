/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .controller("MainCtrl", function ($scope, $http) {
        var self = this;
        self.showUsers = false;
        self.showCars= false;
        self.users = [];
        self.cars = [];

        $http.get("/v1/user/all").success(function (users) {
            self.users = users;
            self.showUsers = true;
        }).error(function () {
            console.log("error getting all users");
        });

        $http.get("/v1/car/all").success(function (cars) {
            self.cars = cars;
            self.showCars = true;
        }).error(function () {
            console.log("error getting all cars");
        });
    });