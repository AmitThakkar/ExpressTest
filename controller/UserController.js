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
            .on("500", function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("204", function () {
                var body = "User not found with Id -> " + request.query.id;
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("200", function (user) {
                var body = JSON.stringify(user);
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    delete: function (request, response) {
        exports.dependencies.UserService.delete(request.query.id)
            .on("500", function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("204", function () {
                var body = "User not found with Id -> " + request.query.id;
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("200", function () {
                var body = "User Deleted, id -> " + request.query.id;
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    save: function (request, response) {
        var userCO = {
            username: request.body.username,
            password: request.body.password
        };
        exports.dependencies.UserService.save(userCO)
            .on("500", function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("201", function (user) {
                var body = JSON.stringify(user);
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("???", function () {
                var body = "User not saved";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    },
    update: function (request, response) {
        var userCO = {
            username: request.body.username,
            password: request.body.password
        };
        exports.dependencies.UserService.update(userCO)
            .on("500", function () {
                var body = "Error Occur, Please try later.";
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("204", function () {
                var body = "User not found with Id -> " + userCO._id;
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            })
            .on("202", function (user) {
                var body = JSON.stringify(user);
                response.writeHead(500, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
                response.end(body);
            });
    }
};