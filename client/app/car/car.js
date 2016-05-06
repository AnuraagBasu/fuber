/**
 * Created by anuraagbasu on 03/05/16.
 */

/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .config(function ($stateProvider) {
        $stateProvider
            .state("car", {
                template: '<div ui-view></div>',
                abstract: true
            })
            .state("car.show", {
                url: "/car/:carId",
                templateUrl: "app/car/car.show.html",
                controller: "CarCtrl as car"
            })
            .state("car.rides", {
                url: "/car/:carId/rides",
                templateUrl: "app/car/car.rides.list.html",
                controller: "CarRidesCtrl as carRides"
            });
    });