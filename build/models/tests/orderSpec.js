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
var Database_1 = __importDefault(require("../../Database"));
var ordermodel_1 = require("../ordermodel");
var usermodel_1 = require("../usermodel");
var productmodel_1 = require("../productmodel");
var ordermodeltest = new ordermodel_1.OrderModel();
var usermodeltest = new usermodel_1.UserModel();
var productmodeltest = new productmodel_1.ProductsModel();
describe('Order Model Testing', function () {
    describe('Testing the exsistance of Order Model Methods', function () {
        it('The Create Method exsists ', function () {
            expect(ordermodeltest.create).toBeDefined();
        });
        it('The add a product to the order Method exsists ', function () {
            expect(ordermodeltest.addnewproducttoorder).toBeDefined();
        });
        it('The Show one order using a user id Method exsists ', function () {
            expect(ordermodeltest.Showorder).toBeDefined();
        });
    });
    describe('Testing the OrderModel,', function () {
        var testUserorder = {
            email: "test.test@test.com",
            firstname: "order user",
            lastname: "test",
            password: "test1234"
        };
        var testOrder = {
            status: "active",
            userid: testUserorder.id
        };
        var productordertest = {
            price: 55,
            name: "testproduct"
        };
        var testUserdelete = {
            email: "test.testdelete333@test.com",
            firstname: "order user",
            lastname: "test",
            password: "test1234"
        };
        var testorderdelete = {
            status: "active",
            userid: testUserdelete.id
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createtestUser, createtestOrder, createtestProduct, createtestUserdelete, createtestOrderdelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create(testUserorder)];
                    case 1:
                        createtestUser = _a.sent();
                        testUserorder.id = createtestUser.id;
                        return [4 /*yield*/, ordermodeltest.create(testOrder)];
                    case 2:
                        createtestOrder = _a.sent();
                        testOrder.id = createtestOrder.id;
                        return [4 /*yield*/, productmodeltest.create(productordertest)];
                    case 3:
                        createtestProduct = _a.sent();
                        productordertest.id = createtestProduct.id;
                        return [4 /*yield*/, usermodeltest.create(testUserdelete)];
                    case 4:
                        createtestUserdelete = _a.sent();
                        testUserdelete.id = createtestUserdelete.id;
                        return [4 /*yield*/, ordermodeltest.create(testorderdelete)];
                    case 5:
                        createtestOrderdelete = _a.sent();
                        testorderdelete.id = createtestOrderdelete.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sqlQuery, sqlQuery_, sqlQuery1, sqlQuery11, sqlQuery2, sqlQuery22, sqlQuery3, sqlQuery33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = 'DELETE FROM productorder;';
                        sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;';
                        sqlQuery1 = 'DELETE FROM products;';
                        sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        sqlQuery2 = 'DELETE FROM orders;';
                        sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
                        sqlQuery3 = 'DELETE FROM users;';
                        sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sqlQuery)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery_)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery1)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery11)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery22)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery3)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery33)];
                    case 9:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method returing a order correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser2, testorder2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create({
                            email: "test2.test2@test.com",
                            firstname: "order user",
                            lastname: "test2",
                            password: "test1234"
                        })];
                    case 1:
                        testUser2 = _a.sent();
                        return [4 /*yield*/, ordermodeltest.create({
                                status: "complete",
                                userid: testUser2.id
                            })];
                    case 2:
                        testorder2 = _a.sent();
                        expect(testorder2).toEqual({
                            id: testorder2.id,
                            status: "complete",
                            userid: "3"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Returning all products method is working correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Allorders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ordermodeltest.indexOrders()];
                    case 1:
                        Allorders = _a.sent();
                        expect(Allorders.length).toBeGreaterThan(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Adding a new product to the order correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productAdd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ordermodeltest.addnewproducttoorder(4, testOrder.id, productordertest.id)];
                    case 1:
                        productAdd = _a.sent();
                        expect(productAdd.id).toBe(1);
                        expect(productAdd).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('removing a product of the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var removeproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ordermodeltest.removeproductOForder(productordertest.id, testOrder.id)];
                    case 1:
                        removeproduct = _a.sent();
                        expect(removeproduct.id).toBe(1);
                        expect(removeproduct).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Showing the order with one or more products is succssufull', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productordertest2, productShow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.create({
                            price: 55,
                            name: "testproduct2"
                        })];
                    case 1:
                        productordertest2 = _a.sent();
                        return [4 /*yield*/, ordermodeltest.addnewproducttoorder(5, testOrder.id, productordertest2.id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, ordermodeltest.Showorder(testOrder.userid)];
                    case 3:
                        productShow = _a.sent();
                        expect(productShow).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Update order method is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUserdelete2, testorder3, orderupdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create({
                            email: "test.testdelet2e@test.com",
                            firstname: "order333 user",
                            lastname: "test33",
                            password: "test123433"
                        })];
                    case 1:
                        testUserdelete2 = _a.sent();
                        return [4 /*yield*/, ordermodeltest.create({
                                status: "active",
                                userid: testUserdelete2.id
                            })];
                    case 2:
                        testorder3 = _a.sent();
                        return [4 /*yield*/, ordermodeltest.update(testorder3)];
                    case 3:
                        orderupdated = _a.sent();
                        expect(orderupdated === null || orderupdated === void 0 ? void 0 : orderupdated.id).toBe(testorder3.id);
                        expect(orderupdated === null || orderupdated === void 0 ? void 0 : orderupdated.status).toBe(testorder3.status);
                        expect(orderupdated === null || orderupdated === void 0 ? void 0 : orderupdated.userid).toBe(testorder3.userid);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Delete order method is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orderdeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ordermodeltest.delete(testorderdelete.id)
                        // expect(orderdeleted?.id).toBe(testorderdelete.id);
                        // expect(orderdeleted?.status).toBe(testorderdelete.status);
                        // expect(orderdeleted?.userid).toBe(testorderdelete.userid);
                    ];
                    case 1:
                        orderdeleted = _a.sent();
                        // expect(orderdeleted?.id).toBe(testorderdelete.id);
                        // expect(orderdeleted?.status).toBe(testorderdelete.status);
                        // expect(orderdeleted?.userid).toBe(testorderdelete.userid);
                        expect(orderdeleted).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
