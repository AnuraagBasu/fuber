/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp", [
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });