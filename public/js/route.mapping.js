'use strict';

var routeProvider;
var dependantModules = [
    "meanStack.constants",
    "meanStack.controllers",
    "meanStack.user.controllers"
];
function addRouteMapping() {
    var routes = [
        getRoutes()
    ];
    _.each(routes, function (route) {
        _.each(route, function (route) {
            routeProvider.when(route.routeURL, {templateUrl: route.templateUrl, controller: route.controller});
        });
    });
}

angular.module('meanStack', dependantModules).
    config(['$routeProvider', function ($routeProvider) {
        routeProvider = $routeProvider;
        $routeProvider.when('/', {templateUrl: 'dashboard.html', controller: 'DashboardController'});
        addRouteMapping();
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

