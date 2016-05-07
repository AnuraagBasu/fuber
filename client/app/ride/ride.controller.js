/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .controller("RideCtrl", function ($scope, $http, $stateParams, ngProgressFactory) {
        var self = this;
        var rideId = $stateParams.rideId;
        self.showTripEndForm = false;
        $scope.progressbar = ngProgressFactory.createInstance();

        function getRideDetails () {
            $scope.progressbar.start();
            $http.get("/v1/ride?rideId=" + rideId).success(function (ride) {
                if (!_.isEmpty(ride)) {
                    var rideDate = new Date(ride.startTime);
                    ride.tripDate = rideDate.getDate() + "/"  + (rideDate.getMonth() +1);
                    ride.tripTime = rideDate.getHours() + ":" + rideDate.getMinutes();

                    self.rideDetails = ride;
                }
                $scope.progressbar.complete();
            }).error(function () {
                $scope.progressbar.complete();
                console.log("Error fetching ride details");
            });
        }

        self.endTrip = function (form) {
            if (!form || form.$invalid) {
                console.log("form is not valid");
                return;
            }

            $scope.progressbar.start();
            var dataToSend = {
                rideId: rideId,
                location: {
                    name: form.name.$viewValue,
                    coordinates: form.longitude.$viewValue + "," + form.latitude.$viewValue
                }
            };

            $http.post("/v1/ride/end", dataToSend).success(function (ride) {
                $scope.progressbar.complete();
                alert("The cost of the trip is: Rs. " + ride.tripCost);

                self.showTripEndForm = false;
                getRideDetails();
            }).error(function () {
                $scope.progressbar.complete();
                console.log("Error in trip end");
            });
        };

        getRideDetails();
    });