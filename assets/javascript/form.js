var app = angular.module('app', [])

.controller('FormController', function($scope, $http) {
    $scope.photos = [];

    $scope.save = function(form) {
        console.log(form)

        //if (form) {
        data = $("form").serializeObject()

        getPhoto();


        $http({
            method: 'POST',
            url: '/api/photos',
            data: data

        }).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            // $scope.photos = data;

            getPhoto();
        })


    }


    function getPhoto() {
        $http({
            method: 'GET',
            url: '/api/photos'
        }).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.photos = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    getPhoto()
});
