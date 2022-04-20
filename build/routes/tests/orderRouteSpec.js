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
var supertest_1 = __importDefault(require("supertest"));
var Database_1 = __importDefault(require("../../Database"));
var productmodel_1 = require("../../models/productmodel");
var usermodel_1 = require("../../models/usermodel");
var ordermodel_1 = require("../../models/ordermodel");
var index_1 = __importDefault(require("../../index"));
var ordermodelRoutetest = new ordermodel_1.OrderModel();
var ProductsModelRoutetest = new productmodel_1.ProductsModel();
var UserModelroutetest = new usermodel_1.UserModel();
var req = (0, supertest_1.default)(index_1.default);
var tokenWanted = "";
describe('Testing the Product Endpoint', function () {
    var testUser = {
        email: "test.test@test.com",
        firstname: "order user",
        lastname: "test",
        password: "test1234"
    };
    var testOrder = {
        status: "active",
        userid: testUser.id
    };
    var testproduct = {
        price: 55,
        name: "testproduct"
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createtestUser, createtestOrder, createtestProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModelroutetest.create(testUser)];
                case 1:
                    createtestUser = _a.sent();
                    testUser.id = createtestUser.id;
                    return [4 /*yield*/, ordermodelRoutetest.create(testOrder)];
                case 2:
                    createtestOrder = _a.sent();
                    testOrder.id = createtestOrder.id;
                    return [4 /*yield*/, ProductsModelRoutetest.create(testproduct)];
                case 3:
                    createtestProduct = _a.sent();
                    testproduct.id = createtestProduct.id;
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
    describe('Checking if the Authintication methods for testing an Order', function () {
        it('Creating and authenticating a user to provide a token for the Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, email, firstname, lastname, Newtoken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/pages/users/authenticate/")
                            .set('Content-type', 'application/json')
                            .send({
                            email: "test.test@test.com",
                            password: 'test1234'
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, id = _a.id, email = _a.email, firstname = _a.firstname, lastname = _a.lastname, Newtoken = _a.Newtoken;
                        expect(id).toBe(testUser.id);
                        expect(email).toBe(testUser.email);
                        tokenWanted = Newtoken;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Orders API`s', function () {
        it('Testing the Create new Order API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser2, res, _a, id, status, userid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserModelroutetest.create({
                            email: "test2.test2@test.com",
                            firstname: "order user",
                            lastname: "test2",
                            password: "test1234"
                        })];
                    case 1:
                        testUser2 = _b.sent();
                        return [4 /*yield*/, req
                                .post("/pages/orders/")
                                .set('Content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(tokenWanted))
                                .send({
                                status: "active",
                                userid: "".concat(testUser2.id)
                            })];
                    case 2:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        _a = res.body.data.order, id = _a.id, status = _a.status, userid = _a.userid;
                        expect(id).toBe(2);
                        // As there is a Created order in the start with has to be done before the test
                        expect(status).toBe("active");
                        expect(userid).toBe("".concat(testUser2.id));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the show all Orders API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/pages/orders/")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Allorders.length).toBeGreaterThanOrEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the Add New Product API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, quantity, orderid, productid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/pages/orders/".concat(testOrder.id, "/addproduct"))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))
                            .send({
                            quantity: 4,
                            productid: "".concat(testproduct.id)
                        })];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data.newproduct, quantity = _a.quantity, orderid = _a.orderid, productid = _a.productid;
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(quantity).toBe(4);
                        expect(orderid).toBe("".concat(testOrder.id));
                        expect(productid).toBe("".concat(testproduct.id));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the delete one product API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .delete("/pages/orders/3")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('add product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/pages/orders/".concat(testOrder.id, "/addproduct"))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))
                            .send({
                            quantity: 4,
                            productid: "".concat(testproduct.id)
                        })];
                    case 1:
                        res = _a.sent();
                        it('Testing the show one Order API', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, req
                                            .get("/pages/orders/".concat(testOrder.userid, "/"))
                                            .set('Content-type', 'application/json')
                                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                                    case 1:
                                        res = _a.sent();
                                        expect(res.status).toBe(200);
                                        expect(res.status).toBeTruthy();
                                        expect(res.body.data.Oneorder.length).toBeGreaterThanOrEqual(1);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it('Testing the Remove Product API', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, req
                                            .delete("/pages/orders/".concat(testOrder.id, "/removeproduct/").concat(testproduct.id))
                                            .set('Content-type', 'application/json')
                                            .set('Authorization', "Bearer ".concat(tokenWanted))
                                        // const{quantity,orderid,productid}=res.body.data.newproduct;
                                    ];
                                    case 1:
                                        res = _a.sent();
                                        // const{quantity,orderid,productid}=res.body.data.newproduct;
                                        expect(res.status).toBe(200);
                                        expect(res.status).toBeTruthy();
                                        expect(res.body.data.removeproduct.orderid).toBe(testOrder.id);
                                        expect(res.body.data.removeproduct.productid).toBe(testproduct.id);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the update one order API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .patch("/pages/orders/".concat(testOrder.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))
                            .send({
                            id: "1",
                            status: "active",
                            userid: "".concat(testUser.id)
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Updatedorder.status).toBe("active");
                        expect(res.body.data.Updatedorder.userid).toBe("".concat(testUser.id));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
