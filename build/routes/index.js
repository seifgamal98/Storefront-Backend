"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_route_1 = __importDefault(require("./pages/user_route"));
var product_route_1 = __importDefault(require("./pages/product_route"));
var order_route_1 = __importDefault(require("./pages/order_route"));
var routes = (0, express_1.Router)();
routes.use('/users', user_route_1.default);
routes.use('/products', product_route_1.default);
routes.use('/orders', order_route_1.default);
exports.default = routes;
