"use strict";

var EventEmitter = require("events").EventEmitter;
var ResponseStatus = require("../src/enum/ResponseStatus");

exports.dependencies = {
    Person: ""
};

exports.get = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.Person.findById(id, function (error, persons) {
        if (error) {
            console.log("Error Occur in PersonService.get", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (persons && persons.length > 0) {
            emitter.emit(ResponseStatus.SUCCESS, persons[0]);
        } else {
            console.log("No persons found with Id -> ", id);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};

exports.delete = function (id) {
    var emitter = new EventEmitter();
    exports.dependencies.Person.removeById(id, function (error, removeCount) {
        if (error) {
            console.log("Error Occur in PersonService.delete", error);
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

exports.save = function (personCO) {
    var emitter = new EventEmitter();
    new exports.dependencies.Person({
        name: personCO.name,
        age: personCO.age,
        place: personCO.place
    }).save(function (error, person) {
            if (error) {
                console.log("Error Occur in PersonService.save", error);
                emitter.emit(ResponseStatus.ERROR);
            } else if (person) {
                emitter.emit(ResponseStatus.SUCCESS, person.toObject());
            } else {
                console.log("Person Not saved with details", JSON.stringify(personCO));
                emitter.emit(ResponseStatus.NOT_SAVED);
            }
        });
    return emitter;
};

exports.update = function (personCO) {
    var emitter = new EventEmitter();
    exports.dependencies.Person.updatePerson(personCO, function (error, updateCount) {
        if (error) {
            console.log("Error Occur in PersonService.update", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (updateCount) {
            emitter.emit(ResponseStatus.SUCCESS);
        } else {
            console.log("No person found with Id -> ", personCO._id);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};

exports.list = function (max, offset) {
    var emitter = new EventEmitter();
    exports.dependencies.Person.findAll(max, offset, function (error, persons) {
        if (error) {
            console.log("Error Occur in PersonService.list", error);
            emitter.emit(ResponseStatus.ERROR);
        } else if (persons && persons.length > 0) {
            exports.dependencies.Person.count(function (error, count) {
                if (error) {
                    console.log("Error Occur in PersonService.list", error);
                    emitter.emit(ResponseStatus.ERROR);
                } else if (count) {
                    emitter.emit(ResponseStatus.SUCCESS, {total: count, persons: persons});
                } else {
                    console.log("Person not found with Max and offset -> " + max + " And " + offset);
                    emitter.emit(ResponseStatus.NOT_FOUND);
                }
            });
        } else {
            console.log("Person not found with Max and offset -> " + max + " And " + offset);
            emitter.emit(ResponseStatus.NOT_FOUND);
        }
    });
    return emitter;
};