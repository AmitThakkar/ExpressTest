var dependantModules = [
    "meanStack.constants",
    "meanStack.person.controllers",
    "meanStack.user.controllers",
    "meanStack.controllers"
];

function getRoutes() {
    var routes = [];
    routes = routes.concat(getPersonRoute());
    routes = routes.concat(getUserRoute());
    return routes;
}