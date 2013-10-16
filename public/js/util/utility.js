"use strict";

function serialize(obj) {
    var params = [];
    for (var p in obj) {
        params.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return params.join("&");
}