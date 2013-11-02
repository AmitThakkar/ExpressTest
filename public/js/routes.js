var dependantModules = [
    "meanStack.constants",
    "meanStack.user.controllers",
    "meanStack.controllers"
];

function getRoutes() {
    var routes = [];
    routes = routes.concat(getUserRoute());
    return routes;
}