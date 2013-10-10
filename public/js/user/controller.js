'use strict';

angular.module('meanStack.user.controllers', [])
    .controller('UserListController', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/user/list/" + $routeParams.max + "/" + $routeParams.offset)
            .success(function (data, status) {
                if (status == 200) {
                    $scope.users = data;
                } else {
                    alert(data);
                }
            })
            .error(function (data, status) {
                console.log(data, status)
            });
    }])
    .controller('UserShowController', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/user/get/" + $routeParams.id)
            .success(function (data, status) {
                if (status == 200) {
                    $scope.user = data;
                } else {
                    alert(data);
                }
            })
            .error(function (data, status) {
                console.log(data, status)
            });
    }])
    .controller('UserCreateController', [function () {
    }]);