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
                alert(data, status)
            });
        $scope.removeUser = function (index, id) {
            if (confirm("Are you sure?")) {
                $http.delete("/user/delete/" + id)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.users.splice(index, 1);
                            $scope.$apply();
                            alert("User Deleted");
                        } else {
                            alert(data);
                        }
                    })
                    .error(function (data, error) {
                        alert(data);
                    });
            }
        };
    }])
    .controller('UserShowController', ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location) {
        $http.get("/user/get/" + $routeParams.id)
            .success(function (data, status) {
                if (status == 200) {
                    $scope.user = data;
                } else {
                    alert(data);
                }
            })
            .error(function (data, status) {
                alert(data, status)
            });
        $scope.removeUser = function (id) {
            if (confirm("Are you sure?")) {
                $http.delete("/user/delete/" + id)
                    .success(function (data, status) {
                        if (status == 200) {
                            $location.path("/user/list/20/0");
                            $scope.$apply();
                        } else {
                            alert(data);
                        }
                    })
                    .error(function (data, error) {
                        alert(data);
                    });
            }
        };
    }])
    .controller('UserCreateController', ["$scope", "$http", "$location", function ($scope, $http, $location) {
        var serialize = function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };
        $scope.saveUser = function () {
            $http.post("/user/save", serialize({ // TODO if you are using jQuery then replace serialize with $.param
                username: $scope.user.username,
                password: $scope.user.password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (data, status) {
                    if (status == 201) {
                        $location.path("/user/list/20/0");
                    } else {
                        alert(data);
                    }
                })
                .error(function (data, status) {
                    alert(data, status)
                });
        };
    }]);