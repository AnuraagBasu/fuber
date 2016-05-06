/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .config(function ($stateProvider) {
        $stateProvider
            .state("user", {
                template: '<div ui-view></div>',
                abstract: true
            })
            .state("user.show", {
                url: "/user/:userId",
                templateUrl: "app/user/user.show.html",
                controller: "UserCtrl as user"
            })
            .state("user.rides", {
                url: "/user/:userId/rides",
                templateUrl: "app/user/user.rides.list.html",
                controller: "UserRidesCtrl as userRides"
            });
    });