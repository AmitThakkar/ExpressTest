var ResponseStatus = require("../src/enum/ResponseStatus");

exports.allowedMethods = {
    "get": ["GET"],
    "delete": ["GET", "DELETE"],
    "save": ["POST"],
    "update": ["PUT", "POST"]
};

exports.dependencies = {
    UserService: ""
};

exports.actions = {
    get: function (request, response) {
        exports.dependencies.UserService.get(request.query.id)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Id -> " + request.query.id;
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
        exports.dependencies.UserService.delete(request.query.id)
            .on(ResponseStatus.ERROR, function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on(ResponseStatus.NOT_FOUND, function () {
                var body = "User not found with Id -> " + request.query.id;
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
            username: request.body.username,
            password: request.body.password
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
            .on(ResponseStatus.NOT_UPDATED, function () {
                var body = "User not saved";
                response.writeHead(203, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    update: function (request, response) {
        var userCO = {
            username: request.body.username,
            password: request.body.password
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
            .on(ResponseStatus.SUCCESS, function (user) {
                var body = JSON.stringify(user);
                response.writeHead(202, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    }
};