"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errormiddleware = function (error, req, res) {
    var status = error.status || 500;
    var message = error.message || "Wrong message";
    res.status(status).json({ status: status, message: message });
};
exports.default = errormiddleware;
