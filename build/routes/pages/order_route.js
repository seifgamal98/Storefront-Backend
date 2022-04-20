"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordermodel_1 = require("../../models/ordermodel");
var authmiddleware_1 = __importDefault(require("../../middleware/authmiddleware"));
var routes = (0, express_1.Router)();
var OrderModelnew = new ordermodel_1.OrderModel();
routes.post('/', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.create(req.body)];
            case 1:
                order = _a.sent();
                res.json({
                    data: { order: order },
                    message: 'Order Created'
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.post('/:id/addproduct', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newproduct, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.addnewproducttoorder(req.body.quantity, req.params.id, req.body.productid)];
            case 1:
                newproduct = _a.sent();
                res.json({
                    data: { newproduct: newproduct },
                    message: 'This product is shown succssuffly'
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.get('/:id', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Oneorder, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.Showorder(req.params.id)];
            case 1:
                Oneorder = _a.sent();
                res.json({
                    data: { Oneorder: Oneorder },
                    message: 'This order is shown succssuffly'
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.get('/', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Allorders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.indexOrders()];
            case 1:
                Allorders = _a.sent();
                res.json({
                    data: { Allorders: Allorders },
                    message: 'All orders is shown succssuffly'
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.delete('/:id', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Deletedorder, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.delete(req.params.id)];
            case 1:
                Deletedorder = _a.sent();
                res.json({
                    data: { Deletedorder: Deletedorder },
                    message: 'This One order is Deleted successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.delete('/:orderid/removeproduct/:productid', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var removeproduct, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.removeproductOForder(req.params.orderid, req.params.productid)];
            case 1:
                removeproduct = _a.sent();
                res.json({
                    data: { removeproduct: removeproduct },
                    message: 'This One product is removed from the order successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
routes.patch('/:id', authmiddleware_1.default, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Updatedorder, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderModelnew.update(req.body)];
            case 1:
                Updatedorder = _a.sent();
                res.json({
                    data: { Updatedorder: Updatedorder },
                    message: 'This One order is updated successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
