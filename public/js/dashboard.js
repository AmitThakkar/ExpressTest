'use strict';


angular.module('meanStack', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'dashboard.html'});
        $routeProvider.when('/user/list', {templateUrl: 'user/list.html'});
        $routeProvider.when('/user/create', {templateUrl: 'user/create.html'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);