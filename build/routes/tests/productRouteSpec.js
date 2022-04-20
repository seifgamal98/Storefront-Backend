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
var index_1 = __importDefault(require("../../index"));
var ProductsModelRoutetest = new productmodel_1.ProductsModel();
var UserModelroutetest = new usermodel_1.UserModel();
var req = (0, supertest_1.default)(index_1.default);
var tokenWanted = "";
describe('Testing the Product Endpoint', function () {
    var testproduct = {
        price: 40,
        name: "testproduct"
    };
    var testUser = {
        email: "test.test@test.com",
        firstname: "test",
        lastname: "test lastname",
        password: "test1234"
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createtestProduct, createtestUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductsModelRoutetest.create(testproduct)];
                case 1:
                    createtestProduct = _a.sent();
                    testproduct.id = createtestProduct.id;
                    return [4 /*yield*/, UserModelroutetest.create(testUser)];
                case 2:
                    createtestUser = _a.sent();
                    testUser.id = createtestUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sqlQuery1, sqlQuery2, sqlQuery3, sqlQuery4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sqlQuery1 = 'DELETE FROM products;';
                    sqlQuery2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
                    sqlQuery3 = 'DELETE FROM users;';
                    sqlQuery4 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sqlQuery1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sqlQuery2)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sqlQuery3)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sqlQuery4)];
                case 5:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Checking if the Authintication methods for testing a Product', function () {
        it('Creating and authenticating a user to provide a token for the Product', function () { return __awaiter(void 0, void 0, void 0, function () {
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
    describe('Testing the Products API`s', function () {
        it('Testing the Create new product API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, price, name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post("/pages/products/")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))
                            .send({
                            price: 55,
                            name: "testproduct2"
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        _a = res.body.data.product, price = _a.price, name = _a.name;
                        // const{message}=res.body.message;
                        expect(price).toBe(55);
                        expect(name).toBe("testproduct2");
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the show all products API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/pages/products/")
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Allproducts.length).toBeGreaterThanOrEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the one user API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/pages/products/".concat(testproduct.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Oneproduct.price).toBe(testproduct.price);
                        expect(res.body.data.Oneproduct.name).toBe("testproduct");
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the update one product API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .patch("/pages/products/".concat(testproduct.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))
                            .send({
                            id: "1",
                            price: 50,
                            name: "apple"
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Updatedproduct.price).toBe(50);
                        expect(res.body.data.Updatedproduct.name).toBe("apple");
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing the delete one product API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .delete("/pages/products/".concat(testproduct.id))
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(tokenWanted))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.status).toBeTruthy();
                        expect(res.body.data.Deletedproduct.price).toBe(50);
                        expect(res.body.data.Deletedproduct.name).toBe("apple");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
