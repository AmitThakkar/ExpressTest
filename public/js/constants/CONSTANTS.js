"use strict";

angular.module("meanStack.constants", [])
    .factory("RESPONSE", function () {
        return {
            SUCCESS: 200,
            CREATED: 201,
            UPDATED: 202
        };
    });