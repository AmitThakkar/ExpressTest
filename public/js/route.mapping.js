'use strict';

var routeProvider;
function addRouteMapping() {
    _.each(getUserRoute(), function (route) {
        routeProvider.when(route.routeURL, {templateUrl: route.templateUrl, controller: route.controller});
    });
}

angular.module('meanStack', ["meanStack.controllers", "meanStack.user.controllers"]).
    config(['$routeProvider', function ($routeProvider) {
        routeProvider = $routeProvider;
        $routeProvider.when('/', {templateUrl: 'dashboard.html', controller: 'DashboardController'});
        addRouteMapping();
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

