'use strict';

angular.module('meanStack', ["meanStack.controllers", "meanStack.user.controllers"]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'dashboard.html', controller: 'DashboardController'});
        $routeProvider.when('/user/list/:max/:offset', {templateUrl: 'user/list.html', controller: "UserListController"});
        $routeProvider.when('/user/create', {templateUrl: 'user/create.html', controller: "UserCreateController"});
        $routeProvider.when('/user/show/:id', {templateUrl: 'user/show.html', controller: "UserShowController"});
        $routeProvider.when('/user/edit/:id', {templateUrl: 'user/edit.html', controller: "UserEditController"});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);