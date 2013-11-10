"use strict";

var ResponseStatus = require("../src/enum/ResponseStatus");

exports.allowedMethods = {
    "get": ["GET"],
    "list": ["GET"],
    "delete": ["GET", "DELETE"],
    "save": ["POST"],
    "update": ["PUT", "POST"]
};

exports.dependencies = {
    PersonService: ""
};

exports.actions = {
    get: function (request, response) {
        exports.dependencies.PersonService.get(request.param("id"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "Person not found with Id -> " + request.param("id");
                response.writeHead(204, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (person) {
                var body = JSON.stringify(person);
                response.writeHead(200, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            });
    },
    delete: function (request, response) {
        exports.dependencies.PersonService.delete(request.param("id"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "Person not found with Id -> " + request.param("id");
                response.writeHead(204, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function () {
                var body = "Person Deleted, id -> " + request.query.id;
                response.writeHead(200, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            });
    },
    save: function (request, response) {
        var personCO = {
            name: request.param('name'),
            age: request.param('age'),
            place: request.param('place')
        };
        exports.dependencies.PersonService.save(personCO)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (person) {
                var body = JSON.stringify(person);
                response.writeHead(201, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.NOT_SAVED, function () {
                var body = "Person not saved";
                response.writeHead(203, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            });
    },
    update: function (request, response) {
        var personCO = {
            _id: request.param('_id'),
            name: request.param('name'),
            age: request.param('age'),
            place: request.param('place')
        };
        exports.dependencies.PersonService.update(personCO)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "Person not found with Id -> " + personCO._id;
                response.writeHead(204, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function () {
                var body = "Person Updated, content -> " + JSON.stringify(personCO);
                response.writeHead(202, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            });
    },
    list: function (request, response) {
        exports.dependencies.PersonService.list(request.param("max"), request.param("offset"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "Person not found with Max and offset -> " + request.query.max + " And " + request.query.offset;
                response.writeHead(204, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (persons) {
                var body = JSON.stringify(persons);
                response.writeHead(200, {"Content-Length": body.length, "Content-Type": "text/plain" });
                response.end(body);
            });
    }
};