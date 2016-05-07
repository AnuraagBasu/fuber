/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("fuberApp")
    .controller("UserCtrl", function ($scope, $http, $stateParams, ngProgressFactory) {
        var self = this;
        var userId = $stateParams.userId;
        self.showRides = false;
        self.rides = [];
        self.ride = {};
        $scope.progressbar = ngProgressFactory.createInstance();

        function getUserDetails () {
            $scope.progressbar.start();
            $http.get("/v1/user?userId=" + userId).success(function (user) {
                if (!_.isEmpty(user)) {
                    self.userDetails = user;
                }

                $scope.progressbar.complete();
            }).error(function () {
                $scope.progressbar.complete();
                console.log("Couldn't get user details");
            });
        }

        self.bookRide = function (form) {
            if (!form || form.$invalid) {
                console.log("form is not valid");
                return;
            }

            $scope.progressbar.start();

            var dataToSend = {
                userId: userId,
                pickUpLocation: {
                    name: form.name.$viewValue,
                    coordinates: form.longitude.$viewValue + "," + form.latitude.$viewValue
                }
            };

            if (form.hasToBePink.$viewValue) {
                dataToSend.hasToBePink = true;
            }

            console.log(dataToSend);

            $http.post("/v1/ride/book", dataToSend).success(function (data) {
                $scope.progressbar.complete();
                if (_.isEmpty(data)) {
                    alert("No cars are available right now. Try again in some time");

                } else {
                    alert("You ride has been successfully booked");

                    self.getRides();
                }
            }).error(function () {
                $scope.progressbar.complete();
                console.log("Error in booking a ride");
            });
        };

        getUserDetails();
    })
    .controller("UserRidesCtrl", function ($scope, $http, $stateParams, ngProgressFactory) {
        var self = this;
        self.userId = $stateParams.userId;
        self.rides = [];
        self.showRides = false;
        self.noRides = false;
        $scope.progressbar = ngProgressFactory.createInstance();

        function getRides () {
            $scope.progressbar.start();
            self.rides = [];
            $http.get("/v1/ride/all?userId=" + self.userId).success(function (rides) {
                if (rides && rides.length) {
                    rides.forEach(function (ride) {
                        var rideDate = new Date(ride.startTime);
                        ride.tripDate = rideDate.getDate() + "/"  + (rideDate.getMonth() +1);
                        ride.tripTime = rideDate.getHours() + ":" + rideDate.getMinutes();

                        self.rides.push(ride);
                    });

                    self.showRides = true;
                } else {
                    self.noRides = true;
                }

                $scope.progressbar.complete();
            }).error(function () {
                $scope.progressbar.complete();
                console.log("Couldn't fetch rides of user");
            });
        }

        getRides();
    });