exports.dependencies = {
    User: ""
};

exports.get = function (id, callback) {
    callback({id: id});
};

exports.update = function (updateUserData, callback) {
    callback({updateUserData: updateUserData});
};

exports.delete = function (id, callback) {
    exports.dependencies.User.removeById(id, function (error, removeCount) {
        if (error) {
            console.log("Error Occur in UserService.delete", error);
            callback("ERROR");
        } else if (removeCount) {
            console.log("User Removed with Id -> ", removeCount);
            callback("SUCCESS");
        } else {
            console.log("No user found with Id -> ", id);
            callback("NOT FOUND");
        }
    });
};

exports.save = function (userCO, callback) {
    new exports.dependencies.User({
        username: userCO.username,
        password: userCO.password,
        role: ["User"]
    }).save(function (error, user) {
            callback(user.toObject());
        });
};