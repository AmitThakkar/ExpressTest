'use strict';

angular.module('meanStack.user.controllers', [])
    .controller('UserListController', ["$scope", "$http", function ($scope, $http) {
        $http.get("/user/list")
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
    .controller('UserCreateController', [function () {
    }]);