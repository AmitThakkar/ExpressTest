"use strict";

var Roles = require("../src/enum/Roles");

exports.init = function () {
    var application = this;
    switch (application.get('env')) {
        case "production":
            bootstrapForProduction();
            break;
        case "qa":
            bootstrapForQA();
            break;
        case "development":
            bootstrapForDevelopment();
            break;
    }
};

function bootstrapForProduction() {

}

function bootstrapForQA() {

}

function bootstrapForDevelopment() {
    console.log("Bootstraping Development Data");
    var User = require("../domain/User");
    User.findByUsername("Amit Kumar", function (error, users) {
        if (!(users && users.length > 0)) {
            new User({
                username: "Amit Kumar",
                password: "123456",
                role: [Roles.USER, Roles.ADMIN]
            }).save(function (error, user) {
                    if (error) {
                        console.log("Error Occur at the time of bootstraping the user");
                    } else if (user) {
                        console.log("User Bootstrap successfully");
                    } else {
                        console.log("User not saved.")
                    }
                });
        }
    });
}