"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var tokenvalidatormiddleware = function (req, _res, next) {
    try {
        var header = req.get('Authorization');
        if (header) {
            var incomingstring = header.split(' ')[0].toLowerCase();
            var incomingtoken = header.split(' ')[1];
            if (incomingtoken && incomingstring === 'bearer') {
                var decoder = jsonwebtoken_1.default.verify(incomingtoken, config_1.default.secerttoken);
                if (decoder) {
                    next();
                }
                else {
                    var error1 = new Error("wrong decoder");
                    error1.status = 401;
                    next(error1);
                }
            }
            else {
                var error1 = new Error("token type not bearer or the token doesnot exsist");
                error1.status = 401;
                next(error1);
            }
        }
        else {
            var error1 = new Error("there are no token present");
            error1.status = 401;
            next(error1);
        }
    }
    catch (error) {
        var error1 = new Error('error while login');
        error1.status = 401;
        next(error1);
    }
};
exports.default = tokenvalidatormiddleware;
