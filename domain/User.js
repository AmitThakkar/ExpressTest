var mongoose = require("mongoose");

var User = new mongoose.Schema({ // add dateCreated dinamically if not present.
    username: String,
    password: String,
    role: Array
});

module.exports = mongoose.model('User', User);

User.methods.findSimilarTypes = function (cb) {
    return User.find({ type: this.type }, cb);
};