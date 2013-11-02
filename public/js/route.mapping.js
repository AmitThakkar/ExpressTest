'use strict';

var routeProvider;
function addRouteMapping() {
    _.each(getRoutes(), function (route) {
        routeProvider.when(route.routeURL, {templateUrl: route.templateUrl, controller: route.controller});
    });
}

angular.module('meanStack', dependantModules).
    config(['$routeProvider', function ($routeProvider) {
        routeProvider = $routeProvider;
        $routeProvider.when('/', {templateUrl: 'dashboard.html', controller: 'DashboardController'});
        addRouteMapping();
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

