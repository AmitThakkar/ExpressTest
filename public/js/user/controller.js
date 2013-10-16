"use strict";

angular.module("meanStack.user.controllers", [])
    .controller("UserListController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        var offset = parseInt($routeParams.offset, 10);
        var max = parseInt($routeParams.max, 10);
        $http.get("/user/list/" + $routeParams.max + "/" + $routeParams.offset)
            .success(function (data, status) {
                if (status == 200) {
                    $scope.users = data.users;
                    $scope.total = parseInt(data.total, 10);
                    $scope.listParams = {
                        max: max,
                        nextOffset: ((offset + max) >= $scope.total) ? -1 : offset + max,
                        previousOffset: offset == 0 ? -1 : offset - max
                    };
                } else {
                    alert(data);
                }
            })
            .error(function (data, status) {
                alert(data, status);
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
    .controller("UserShowController", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location) {
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
                            $location.path("/user/list/10/0");
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
    .controller("UserCreateController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
        $scope.saveUser = function () {
            $http.post("/user/save", serialize({
                username: $scope.user.username,
                password: $scope.user.password,
                role: $scope.user.role
        }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
                .success(function (data, status) {
                    if (status == 201) {
                        $location.path("/user/list/10/0");
                    } else {
                        alert(data);
                    }
                })
                .error(function (data, status) {
                    alert(data, status)
                });
        };
    }])
    .controller("UserEditController", ["$scope", "$http", "$location", "$routeParams", function ($scope, $http, $location, $routeParams) {
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
            $scope.updateUser = function () {
                $http.put("/user/update", serialize({
            _id: $scope.user._id,
            username: $scope.user.username,
            password: $scope.user.password,
            role: $scope.user.role
        }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).success(function (data, status) {
                        if (status == 202) {
                            $location.path("/user/show/" + $routeParams.id);
                        } else {
                            alert(data);
                        }
                    })
                    .error(function (data, status) {
                        alert(data, status)
                    });
            };
            $scope.removeUser = function (id) {
                if (confirm("Are you sure?")) {
                    $http.delete("/user/delete/" + id)
                        .success(function (data, status) {
                            if (status == 200) {
                                $location.path("/user/list/10/0");
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
        }]);