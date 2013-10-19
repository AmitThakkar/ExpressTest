"use strict";

function getUserRoute() {
    return [
        {routeURL: "/user/list/:max/:offset", templateUrl: "user/list.html", controller: "UserListController"},
        {routeURL: "/user/create", templateUrl: "user/create.html", controller: "UserCreateController"},
        {routeURL: "/user/show/:id", templateUrl: "user/show.html", controller: "UserShowController"},
        {routeURL: "/user/edit/:id", templateUrl: "user/edit.html", controller: "UserEditController"}
    ];
}