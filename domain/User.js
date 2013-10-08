var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId

var User = new mongoose.Schema({ // add dateCreated dinamically if not present.
    username: String,
    password: String,
    role: Array
});

User.statics.findById = function (id, projection, callback) {
    this.find({ _id: ObjectId(id)}, projection, callback);
};
User.statics.removeById = function (id, callback) {
    this.remove({ _id: ObjectId(id)}, callback);
};

module.exports = mongoose.model('User', User);