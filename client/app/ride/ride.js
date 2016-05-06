/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .config(function ($stateProvider) {
        $stateProvider
            .state("ride", {
                url: "/ride/:rideId",
                templateUrl: "app/ride/ride.html",
                controller: "RideCtrl as ride"
            });
    });