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
        exports.dependencies.UserService.get(request.query.id, function (user) {
            response.end(JSON.stringify(user));
        });
    },
    update: function (request, response) {
        exports.dependencies.UserService.update(request.query.updateUserData, function (user) {
            response.end(JSON.stringify(user));
        });
    },
    delete: function (request, response) {
        exports.dependencies.UserService.delete(request.query.id, function (user) {
            response.end(JSON.stringify(user));
        });
    },
    save: function (request, response) {
        exports.dependencies.UserService.save(request.query.newUserData, function (user) {
            response.end(JSON.stringify(user));
        });
    }
};