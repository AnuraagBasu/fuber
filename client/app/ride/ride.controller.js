/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .controller("RideCtrl", function ($scope, $http, $stateParams) {
        var self = this;
        var rideId = $stateParams.rideId;
        self.showTripEndForm = false;

        function getRideDetails () {
            $http.get("/v1/ride?rideId=" + rideId).success(function (ride) {
                if (!_.isEmpty(ride)) {
                    var rideDate = new Date(ride.startTime);
                    ride.tripDate = rideDate.getDate() + "/"  + (rideDate.getMonth() +1);
                    ride.tripTime = rideDate.getHours() + ":" + rideDate.getMinutes();

                    self.rideDetails = ride;
                }
            }).error(function () {
                console.log("Error fetching ride details");
            });
        }

        self.endTrip = function (form) {
            if (!form || form.$invalid) {
                console.log("form is not valid");
                return;
            }

            var dataToSend = {
                rideId: rideId,
                location: {
                    name: form.name.$viewValue,
                    coordinates: form.longitude.$viewValue + "," + form.latitude.$viewValue
                }
            };

            $http.post("/v1/ride/end", dataToSend).success(function (ride) {
                alert("The cost of the trip is: Rs. " + ride.tripCost);

                self.showTripEndForm = false;
                getRideDetails();
            }).error(function () {
                console.log("Error in trip end");
            });
        };

        getRideDetails();
    });