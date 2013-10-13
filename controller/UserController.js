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
    UserService: ""
};

exports.actions = {
    get: function (request, response) {
        exports.dependencies.UserService.get(request.param("id"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Id -> " + request.param("id");
                response.writeHead(204, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (user) {
                var body = JSON.stringify(user);
                response.writeHead(200, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    delete: function (request, response) {
        exports.dependencies.UserService.delete(request.param("id"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Id -> " + request.param("id");
                response.writeHead(204, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function () {
                var body = "User Deleted, id -> " + request.query.id;
                response.writeHead(200, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    save: function (request, response) {
        var userCO = {
            username: request.param("username"),
            password: request.param("password")
        };
        exports.dependencies.UserService.save(userCO)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (user) {
                var body = JSON.stringify(user);
                response.writeHead(201, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_SAVED, function () {
                var body = "User not saved";
                response.writeHead(203, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    update: function (request, response) {
        var userCO = {
            _id: request.param("_id"),
            username: request.param("username"),
            password: request.param("password")
        };
        exports.dependencies.UserService.update(userCO)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Id -> " + userCO._id;
                response.writeHead(204, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function () {
                var body = "User Updated, content -> " + JSON.stringify(userCO);
                response.writeHead(202, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    list: function (request, response) {
        exports.dependencies.UserService.list(request.param("max"), request.param("offset"))
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Max and offset -> " + request.query.max + " And " + request.query.offset;
                response.writeHead(204, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.SUCCESS, function (users) {
                var body = JSON.stringify(users);
                response.writeHead(200, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    }
};