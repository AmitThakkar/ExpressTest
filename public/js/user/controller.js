"use strict";

angular.module("meanStack.user.controllers", [])
    .controller("UserListController", ["$scope", "$http", "$routeParams", "RESPONSE", 
        function ($scope, $http, $routeParams, RESPONSE) {
            var offset = parseInt($routeParams.offset, 10);
            var max = parseInt($routeParams.max, 10);
            $http.get("/user/list/" + $routeParams.max + "/" + $routeParams.offset)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
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
                            if (status == RESPONSE.SUCCESS) {
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
    .controller("UserShowController", ["$scope", "$http", "$routeParams", "$location", "RESPONSE", 
        function ($scope, $http, $routeParams, $location, RESPONSE) {
            $http.get("/user/get/" + $routeParams.id)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
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
                            if (status == RESPONSE.SUCCESS) {
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
    .controller("UserCreateController", ["$scope", "$http", "$location", "RESPONSE", 
        function ($scope, $http, $location, RESPONSE) {
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
                        if (status == RESPONSE.CREATED) {
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
    .controller("UserEditController", ["$scope", "$http", "$location", "$routeParams", "RESPONSE", 
        function ($scope, $http, $location, $routeParams, RESPONSE) {
            $http.get("/user/get/" + $routeParams.id)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
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
                        if (status == RESPONSE.UPDATED) {
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
                            if (status == RESPONSE.SUCCESS) {
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