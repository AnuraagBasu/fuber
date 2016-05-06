/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .config(function ($stateProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                templateUrl: "app/main/main.html",
                controller: "MainCtrl as main"
            });
    });