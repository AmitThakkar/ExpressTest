exports.doURLMappings = function () {
    var application = this;
    var fs = require('fs');
    var _ = require('underscore');
    var services = {};
    fs.readdir("./service", function (error, serviceFileNames) {
        if (error) {
            console.log("Error occur at the time of reading Services");
        } else if (serviceFileNames && serviceFileNames.length > 0) {
            serviceFileNames.forEach(function (service) {
                services[/(.*)(.js)/g.exec(service)[1]] = require("../service/" + service);
            });
        }
        fs.readdir("./controller", function (error, controllerFileNames) {
            if (error) {
                console.log("Error Occur at the time of reading Controllers");
            } else if (controllerFileNames && controllerFileNames.length > 0) {
                controllerFileNames.forEach(function (controller) {
                    var controllerName = /(.*)(Controller)/.exec(controller)[1];
                    var controller = require("../controller/" + controller);
                    _.each(controller.actions, function (handler, actionName) {
                        controller.allowedMethods[actionName].forEach(function (methodName) {
                            application[methodName.toLowerCase()]('/' + controllerName + "/" + actionName, handler);
                        });
                    });
                    _.each(controller.dependencies, function (value, dependency) {
                        controller.dependencies[dependency] = services[dependency];
                    });
                });
            } else {
                console.log("No Controller found");
            }
        });
    });
};