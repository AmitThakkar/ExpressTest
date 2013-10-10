'use strict';


angular.module('meanStack', ["meanStack.controllers"]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: '_dashboard.html', controller: 'DashboardController'});
        $routeProvider.when('/user/list', {templateUrl: 'user/list.html', controller: "UserListController"});
        $routeProvider.when('/user/create', {templateUrl: 'user/create.html', controller: "UserCreateController"});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);