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
var productmodel_1 = require("../productmodel");
var productmodeltest = new productmodel_1.ProductsModel;
describe('Product Model Testing', function () {
    describe('Testing the exsistance of Product Model Methods', function () {
        it('The Create Method exsists ', function () {
            expect(productmodeltest.create).toBeDefined();
        });
        it('The Show all products Method exsists ', function () {
            expect(productmodeltest.index).toBeDefined();
        });
        it('The Show one product Method exsists ', function () {
            expect(productmodeltest.show).toBeDefined();
        });
        it('The Delete one product Method exsists ', function () {
            expect(productmodeltest.delete).toBeDefined();
        });
        it('The Update one product Method exsists ', function () {
            expect(productmodeltest.update).toBeDefined();
        });
    });
    describe('Testing the ProductModel', function () {
        var testproduct = {
            price: 40,
            name: "testproduct"
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createtestProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.create(testproduct)];
                    case 1:
                        createtestProduct = _a.sent();
                        testproduct.id = createtestProduct.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sqlQuery, sqlQuery2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = 'DELETE FROM products;';
                        sqlQuery2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sqlQuery)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery2)];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method returing a product correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productUser2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.create({
                            price: 55,
                            name: "testproduct2"
                        })];
                    case 1:
                        productUser2 = _a.sent();
                        expect(productUser2).toEqual({
                            id: productUser2.id,
                            price: 55,
                            name: "testproduct2"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Returning all products method is working correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Allproducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.index()];
                    case 1:
                        Allproducts = _a.sent();
                        expect(Allproducts.length).toBeGreaterThan(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Returning the asked for product correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Oneproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.show(testproduct.id)];
                    case 1:
                        Oneproduct = _a.sent();
                        expect(Oneproduct.id).toBe(testproduct.id);
                        expect(Oneproduct.price).toBe(40);
                        expect(Oneproduct.name).toBe("testproduct");
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Delete product method is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productdeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.delete(testproduct.id)];
                    case 1:
                        productdeleted = _a.sent();
                        expect(productdeleted === null || productdeleted === void 0 ? void 0 : productdeleted.id).toBe(testproduct.id);
                        expect(productdeleted === null || productdeleted === void 0 ? void 0 : productdeleted.price).toBe(testproduct.price);
                        expect(productdeleted === null || productdeleted === void 0 ? void 0 : productdeleted.name).toBe(testproduct.name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Update product method is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser3, productupdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productmodeltest.create({
                            price: 60,
                            name: "producttest2"
                        })];
                    case 1:
                        testUser3 = _a.sent();
                        return [4 /*yield*/, productmodeltest.update(testUser3)];
                    case 2:
                        productupdated = _a.sent();
                        expect(productupdated === null || productupdated === void 0 ? void 0 : productupdated.id).toBe(testUser3.id);
                        expect(productupdated === null || productupdated === void 0 ? void 0 : productupdated.price).toBe(testUser3.price);
                        expect(productupdated === null || productupdated === void 0 ? void 0 : productupdated.name).toBe(testUser3.name);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
