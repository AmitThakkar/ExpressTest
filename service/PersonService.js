"use strict";

var EventEmitter = require("events").EventEmitter;
var ResponseStatus = require("../src/enum/ResponseStatus");
var Roles = require("../src/enum/Roles");

exports.dependencies = {
    User: ""
};

exports.get = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.User.findById(id, function (error, users) {
        if (error) {
            console.log("Error Occur in UserService.get", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (users && users.length > 0) {
            emitter.emit(ResponseStatus.SUCCESS, users[0]);
        } else {
            console.log("No users found with Id -> ", id);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};

exports.delete = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.User.removeById(id, function (error, removeCount) {
        if (error) {
            console.log("Error Occur in UserService.delete", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (removeCount) {
            emitter.emit(ResponseStatus.SUCCESS);
        } else {
            console.log("No person found with Id -> ", id);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};

exports.save = function (userCO) {
    var emitter = new EventEmitter();
    new exports.dependencies.User({
        username: userCO.username,
        password: userCO.password,
        role: [Roles.USER]
    }).save(function (error, user) {
            if (error) {
                console.log("Error Occur in UserService.save", error);
                emitter.emit(ResponseStatus.ERROR);
            } else if (user) {
                emitter.emit(ResponseStatus.SUCCESS, user.toObject());
            } else {
                console.log("User Not saved with details", JSON.stringify(userCO));
                emitter.emit(ResponseStatus.NOT_SAVED);
            }
        });
    return emitter;
};

exports.update = function (userCO) {
    var emitter = new EventEmitter();
    exports.dependencies.User.updateUser(userCO, function (error, updateCount) {
        if (error) {
            console.log("Error Occur in UserService.update", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (updateCount) {
            emitter.emit(ResponseStatus.SUCCESS);
        } else {
            console.log("No user found with Id -> ", userCO._id);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};

exports.list = function (max, offset) {
    var emitter = new EventEmitter();
    exports.dependencies.User.findAll(max, offset, function (error, users) {
        if (error) {
            console.log("Error Occur in UserService.list", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (users && users.length > 0) {
            exports.dependencies.User.count(function (error, count) {
                if (error) {
                    console.log("Error Occur in UserService.list", error);
                    emitter.emit(ResponseStatus.ERROR);
                } else if (count) {
                    emitter.emit(ResponseStatus.SUCCESS, {total: count, users: users});
                } else {
                    console.log("User not found with Max and offset -> " + max + " And " + offset);
                    emitter.emit(ResponseStatus.NOT_FOUND);
                }
            });
        } else {
            console.log("User not found with Max and offset -> " + max + " And " + offset);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};
