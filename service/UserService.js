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
    callback({id: id});
};

exports.save = function (newUserData, callback) {
    callback({newUserData: newUserData});
};