"use strict";

angular.module("meanStack.person.controllers", [])
    .controller("PersonListController", ["$scope", "$http", "$routeParams", "RESPONSE",
        function ($scope, $http, $routeParams, RESPONSE) {
            var offset = parseInt($routeParams.offset, 10);
            var max = parseInt($routeParams.max, 10);
            $http.get("/person/list/" + $routeParams.max + "/" + $routeParams.offset)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
                        $scope.persons = data.persons;
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
            $scope.removePerson = function (index, id) {
                if (confirm("Are you sure?")) {
                    $http.delete("/person/delete/" + id)
                        .success(function (data, status) {
                            if (status == RESPONSE.SUCCESS) {
                                $scope.persons.splice(index, 1);
                                $scope.$apply();
                                alert("Person Deleted");
                            } else {
                                alert(data);
                            }
                        })
                        .error(function (data) {
                            alert(data);
                        });
                }
            };
        }])
    .controller("PersonShowController", ["$scope", "$http", "$routeParams", "$location", "RESPONSE",
        function ($scope, $http, $routeParams, $location, RESPONSE) {
            $http.get("/person/get/" + $routeParams.id)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
                        $scope.person = data;
                    } else {
                        alert(data);
                    }
                })
                .error(function (data, status) {
                    alert(data, status)
                });
            $scope.removePerson = function (id) {
                if (confirm("Are you sure?")) {
                    $http.delete("/person/delete/" + id)
                        .success(function (data, status) {
                            if (status == RESPONSE.SUCCESS) {
                                $location.path("/person/list/10/0");
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
    .controller("PersonCreateController", ["$scope", "$http", "$location", "RESPONSE",
        function ($scope, $http, $location, RESPONSE) {
            $scope.savePerson = function () {
                $http.post("/person/save", serialize({
                    name: $scope.person.name,
                    age: $scope.person.age,
                    place: $scope.person.place
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
                    .success(function (data, status) {
                        if (status == RESPONSE.CREATED) {
                            $location.path("/person/list/10/0");
                        } else {
                            alert(data);
                        }
                    })
                    .error(function (data, status) {
                        alert(data)
                    });
            };
        }])
    .controller("PersonEditController", ["$scope", "$http", "$location", "$routeParams", "RESPONSE",
        function ($scope, $http, $location, $routeParams, RESPONSE) {
            $http.get("/person/get/" + $routeParams.id)
                .success(function (data, status) {
                    if (status == RESPONSE.SUCCESS) {
                        $scope.person = data;
                    } else {
                        alert(data);
                    }
                })
                .error(function (data, status) {
                    alert(data, status)
                });
            $scope.updatePerson = function () {
                $http.put("/person/update", serialize({
                    _id: $scope.person._id,
                    name: $scope.person.name,
                    age: $scope.person.age,
                    place: $scope.person.place
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).success(function (data, status) {
                        if (status == RESPONSE.UPDATED) {
                            $location.path("/person/show/" + $routeParams.id);
                        } else {
                            alert(data);
                        }
                    })
                    .error(function (data, status) {
                        alert(data, status)
                    });
            };
            $scope.removePerson = function (id) {
                if (confirm("Are you sure?")) {
                    $http.delete("/person/delete/" + id)
                        .success(function (data, status) {
                            if (status == RESPONSE.SUCCESS) {
                                $location.path("/person/list/10/0");
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