var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId

var User = new mongoose.Schema({ // add dateCreated dinamically if not present. + unique
    username: String,
    password: String,
    role: Array
});

User.statics.findById = function (id, projection, callback) {
    if (!callback) {
        callback = projection;
        projection = {};
    }
    this.find({ _id: ObjectId(id)}, projection, callback);
};
User.statics.findAll = function (max, offset, projection, callback) {
    if (!callback) {
        callback = projection;
        projection = {};
    }
    this.find({}, projection, {limit: max, skip: offset}, callback);
};
User.statics.removeById = function (id, callback) {
    this.remove({ _id: ObjectId(id)}, callback);
};
User.statics.updateUser = function (userCO, callback) {
    User.update({ _id: ObjectId(userCO._id)}, userCO, {multi: false, upsert: false}, callback);
};

module.exports = mongoose.model('User', User);