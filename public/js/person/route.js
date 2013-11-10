"use strict";

function getPersonRoute() {
    return [
        {routeURL: "/person/list/:max/:offset", templateUrl: "person/list.html", controller: "PersonListController"},
        {routeURL: "/person/create", templateUrl: "person/create.html", controller: "PersonCreateController"},
        {routeURL: "/person/show/:id", templateUrl: "person/show.html", controller: "PersonShowController"},
        {routeURL: "/person/edit/:id", templateUrl: "person/edit.html", controller: "PersonEditController"}
    ];
}