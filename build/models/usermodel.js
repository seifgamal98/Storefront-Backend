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
exports.UserModel = void 0;
var Database_1 = __importDefault(require("../Database"));
var config_1 = __importDefault(require("../config"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var hashedpassword = function (password) {
    var salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync("".concat(password).concat(config_1.default.pepper), salt);
};
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuery, output, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = "INSERT INTO users(email,firstname,lastname,password) VALUES ($1,$2,$3,$4) RETURNING id,email,firstname,lastname";
                        return [4 /*yield*/, conn.query(sqlQuery, [
                                user.email,
                                user.firstname,
                                user.lastname,
                                hashedpassword(user.password)
                            ])];
                    case 2:
                        output = _a.sent();
                        conn.release();
                        return [2 /*return*/, output.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Unable to create a new user ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuery, output, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = "SELECT id,email,firstname,lastname FROM users";
                        return [4 /*yield*/, conn.query(sqlQuery)];
                    case 2:
                        output = _a.sent();
                        conn.release();
                        return [2 /*return*/, output.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Unable to view all the users ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuery, output, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = "SELECT id,email,firstname,lastname FROM users WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlQuery, [id])];
                    case 2:
                        output = _a.sent();
                        conn.release();
                        return [2 /*return*/, output.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Unable to view this user ".concat(id, " ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuerystar, output, sqlQuery_, sqlQuery11, sqlQuery22, sqlQuery33, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuerystar = "DELETE FROM users WHERE id=($1) RETURNING id,email,firstname,lastname";
                        return [4 /*yield*/, conn.query(sqlQuerystar, [id])];
                    case 2:
                        output = _a.sent();
                        sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;';
                        sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
                        sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sqlQuery_)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery11)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery22)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery33)];
                    case 6:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, output.rows[0]];
                    case 7:
                        err_4 = _a.sent();
                        throw new Error("Unable to delete this user ".concat(id, " ").concat(err_4));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuery, sqlQuery_, sqlQuery11, sqlQuery22, sqlQuery33, output, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = "UPDATE users SET email=$1,firstname=$2,lastname=$3,password=$4 WHERE id=$5 RETURNING id,email,firstname,lastname";
                        sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;';
                        sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
                        sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sqlQuery, [
                                user.email,
                                user.firstname,
                                user.lastname,
                                hashedpassword(user.password),
                                user.id
                            ])];
                    case 2:
                        output = _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery_)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery11)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery22)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, conn.query(sqlQuery33)];
                    case 6:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, output.rows[0]];
                    case 7:
                        err_5 = _a.sent();
                        throw new Error("Unable to delete this user ".concat(err_5));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlQuery, output, hashedpassword2, correctpassword, sqlQuery2, output2, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlQuery = "SELECT password FROM users WHERE email=$1";
                        return [4 /*yield*/, conn.query(sqlQuery, [email])];
                    case 2:
                        output = _a.sent();
                        if (!output.rows.length) return [3 /*break*/, 4];
                        hashedpassword2 = output.rows[0].password;
                        correctpassword = bcrypt_1.default.compareSync("".concat(password).concat(config_1.default.pepper), hashedpassword2);
                        if (!correctpassword) return [3 /*break*/, 4];
                        sqlQuery2 = "SELECT id,email,firstname,lastname FROM users WHERE email=$1";
                        return [4 /*yield*/, conn.query(sqlQuery2, [email])];
                    case 3:
                        output2 = _a.sent();
                        return [2 /*return*/, output2.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_6 = _a.sent();
                        throw new Error("Unable to login ".concat(err_6));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
