var EventEmitter = require("events").EventEmitter;

exports.dependencies = {
    User: ""
};

exports.get = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.User.findById(id, function (error, user) {
        if (error) {
            console.log("Error Occur in UserService.get", error);
            emitter.emit("500");
        } else if (user && user.length > 0) {
            emitter.emit("200", user[0]);
        } else {
            console.log("No user found with Id -> ", id);
            emitter.emit("204");
        }
    });
    return emitter;
};

exports.delete = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.User.removeById(id, function (error, removeCount) {
        if (error) {
            console.log("Error Occur in UserService.delete", error);
            emitter.emit("500");
        } else if (removeCount) {
            emitter.emit("200");
        } else {
            console.log("No user found with Id -> ", id);
            emitter.emit("204");
        }
    });
    return emitter;
};

exports.save = function (userCO) {
    var emitter = new EventEmitter();
    new exports.dependencies.User({
        username: userCO.username,
        password: userCO.password,
        role: ["User"]
    }).save(function (error, user) {
            if (error) {
                console.log("Error Occur in UserService.save", error);
                emitter.emit("500");
            } else if (user) {
                emitter.emit("201", user.toObject());
            } else {
                console.log("User Not saved with details", JSON.stringify(userCO));
                emitter.emit("???");
            }
        });
    return emitter;
};

exports.update = function (userCO) {
    var emitter = new EventEmitter();
    new exports.dependencies.User.updateUser(userCO, function (error, updateCount) {
        if (error) {
            console.log("Error Occur in UserService.update", error);
            emitter.emit("500");
        } else if (updateCount) {
            emitter.emit("202");
        } else {
            console.log("No user found with Id -> ", userCO._id);
            emitter.emit("204");
        }
    });
    return emitter;
};