/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .controller("CarCtrl", function ($scope, $http, $stateParams) {
        var self = this;
        var carId = $stateParams.carId;
        self.showForm = false;
        self.showRides = false;
        self.rides = [];

        function getCarDetails () {
            $http.get("/v1/car?carId=" + carId).success(function (car) {
                if (!_.isEmpty(car)) {
                    self.carDetails = car;
                }
            }).error(function () {
                console.log("Error getting car details");
            });
        }

        self.activateCar = function (form) {
            if (!form || form.$invalid) {
                console.log("form is not valid");
                return;
            }

            var dataToSend = {
                licensePlate: self.carDetails.licensePlate,
                location: {
                    name: form.name.$viewValue,
                    coordinates: form.longitude.$viewValue + "," + form.latitude.$viewValue
                }
            };

            $http.post("/v1/car/activate", dataToSend).success(function (data) {
                if (data) {
                    alert("Your car is activated now. Wait till you are assigned a ride");

                    self.showForm = false;
                    getCarDetails();
                } else {
                    alert("Couldn't process your request");
                }
            }).error(function () {
                console.log("Error activating car");
            });
        };

        self.deactivateCar = function () {
            $http.post("/v1/car/deactivate", {licensePlate: self.carDetails.licensePlate}).success(function (data) {
                if (data) {
                    alert("Your car is de-activated now");

                    getCarDetails();
                } else {
                    alert("Couldn't process your request");
                }
            }).error(function () {
                console.log("Error in deactivating car");
            });
        };

        getCarDetails();

    })
    .controller("CarRidesCtrl", function ($scope, $http, $stateParams) {
        var self = this;
        var carId = $stateParams.carId;
        self.rides = [];
        self.showRides = false;
        self.noRides = false;

        function getRides () {
            self.rides = [];
            $http.get("/v1/ride/all?carId=" + carId).success(function (rides) {
                if (rides && rides.length) {
                    rides.forEach(function (ride) {
                        var rideDate = new Date(ride.startTime);
                        ride.tripDate = rideDate.getDate() + "/"  + (rideDate.getMonth() +1);
                        ride.tripTime = rideDate.getHours() + ":" + rideDate.getMinutes();

                        self.rides.push(ride);
                    });

                    self.showRides = true;
                }
            }).error(function () {
                console.log("Couldn't fetch rides of car");
            });
        }

        getRides();
    });