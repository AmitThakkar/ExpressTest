"use strict";

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var Person = new mongoose.Schema({
    "name": String,
    "age": String,
    "place": String
});

Person.statics.findById = function (id, projection, callback) {
    if (!callback) {
        callback = projection;
        projection = {};
    }
    this.find({ _id: ObjectId(id)}, projection, callback);
};
Person.statics.findAll = function (max, offset, projection, callback) {
    if (!callback) {
        callback = projection;
        projection = {};
    }
    this.find({}, projection, {limit: max, skip: offset}, callback);
};
Person.statics.removeById = function (id, callback) {
    this.remove({ _id: ObjectId(id)}, callback);
};
Person.statics.updatePerson = function (personCO, callback) {
    var _id = personCO._id;
    delete personCO._id;
    this.update({ _id: ObjectId(_id)}, personCO, {multi: false, upsert: false}, callback);
};

module.exports = mongoose.model("Person", Person);