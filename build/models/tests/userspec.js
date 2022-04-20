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
var usermodel_1 = require("../usermodel");
var usermodeltest = new usermodel_1.UserModel();
describe('User Model Testing', function () {
    describe('Testing the exsistance of User Model Methods', function () {
        it('The Create Method exsists ', function () {
            expect(usermodeltest.create).toBeDefined();
        });
        it('The Show all users Method exsists ', function () {
            expect(usermodeltest.index).toBeDefined();
        });
        it('The Show one user Method exsists ', function () {
            expect(usermodeltest.show).toBeDefined();
        });
        it('The Authenticate Method exsists ', function () {
            expect(usermodeltest.authenticate).toBeDefined();
        });
        it('The Delete One User Method exsists ', function () {
            expect(usermodeltest.delete).toBeDefined();
        });
        it('The Update One User Method exsists ', function () {
            expect(usermodeltest.update).toBeDefined();
        });
    });
    describe('Testing the UserModel', function () {
        var testUser = {
            email: "seif.gamaltest@test.com",
            firstname: "seif",
            lastname: "gamaltest",
            password: "test1234"
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createtestUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create(testUser)];
                    case 1:
                        createtestUser = _a.sent();
                        testUser.id = createtestUser.id;
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
                        sqlQuery = 'DELETE FROM users;';
                        sqlQuery2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
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
        it('Create method returing a user correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create({
                            email: "seif.gamaltest2@test.com",
                            firstname: "seif",
                            lastname: "gamaltest2",
                            password: "test1234"
                        })];
                    case 1:
                        testUser2 = _a.sent();
                        expect(testUser2).toEqual({
                            id: testUser2.id,
                            email: "seif.gamaltest2@test.com",
                            firstname: "seif",
                            lastname: "gamaltest2"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Returning all users method is working correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var AllUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.index()];
                    case 1:
                        AllUsers = _a.sent();
                        expect(AllUsers.length).toBeGreaterThan(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Returning the asked for user correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Oneuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.show(testUser.id)];
                    case 1:
                        Oneuser = _a.sent();
                        expect(Oneuser.id).toBe(testUser.id);
                        expect(Oneuser.email).toBe("seif.gamaltest@test.com");
                        expect(Oneuser.firstname).toBe("seif");
                        expect(Oneuser.lastname).toBe("gamaltest");
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Authenticating methode is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var UserAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.authenticate(testUser.email, testUser.password)];
                    case 1:
                        UserAuth = _a.sent();
                        expect(UserAuth === null || UserAuth === void 0 ? void 0 : UserAuth.email).toBe(testUser.email);
                        expect(UserAuth === null || UserAuth === void 0 ? void 0 : UserAuth.firstname).toBe(testUser.firstname);
                        expect(UserAuth === null || UserAuth === void 0 ? void 0 : UserAuth.lastname).toBe(testUser.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Delete methode is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Userdeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.delete(testUser.id)];
                    case 1:
                        Userdeleted = _a.sent();
                        expect(Userdeleted === null || Userdeleted === void 0 ? void 0 : Userdeleted.id).toBe(testUser.id);
                        expect(Userdeleted === null || Userdeleted === void 0 ? void 0 : Userdeleted.email).toBe(testUser.email);
                        expect(Userdeleted === null || Userdeleted === void 0 ? void 0 : Userdeleted.firstname).toBe(testUser.firstname);
                        expect(Userdeleted === null || Userdeleted === void 0 ? void 0 : Userdeleted.lastname).toBe(testUser.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Checking if the Update methode is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser3, Userupdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodeltest.create({
                            email: "seif.gamaltest3@test.com",
                            firstname: "seif",
                            lastname: "gamaltest2",
                            password: "test1234"
                        })];
                    case 1:
                        testUser3 = _a.sent();
                        return [4 /*yield*/, usermodeltest.update(testUser3)];
                    case 2:
                        Userupdated = _a.sent();
                        expect(Userupdated === null || Userupdated === void 0 ? void 0 : Userupdated.id).toBe(testUser3.id);
                        expect(Userupdated === null || Userupdated === void 0 ? void 0 : Userupdated.email).toBe(testUser3.email);
                        expect(Userupdated === null || Userupdated === void 0 ? void 0 : Userupdated.firstname).toBe(testUser3.firstname);
                        expect(Userupdated === null || Userupdated === void 0 ? void 0 : Userupdated.lastname).toBe(testUser3.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
