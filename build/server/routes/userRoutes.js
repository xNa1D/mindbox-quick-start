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
var User_1 = __importDefault(require("../models/User"));
var generateAccessToken_1 = __importDefault(require("../helpers/generateAccessToken"));
var userRoutes = express_1.Router();
userRoutes.post("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isLoggedSuccessfully, accessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = new User_1.default(req.body.email, req.body.password);
                return [4 /*yield*/, user.loginStuff()];
            case 1:
                isLoggedSuccessfully = _a.sent();
                accessToken = void 0;
                if (isLoggedSuccessfully) {
                    accessToken = generateAccessToken_1.default(user.email);
                    res.send(accessToken);
                }
                else {
                    res.sendStatus(403);
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.sendStatus(503);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.post("/reg", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isUserExist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = new User_1.default(req.body.email, req.body.password);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user.isStuffExistInMindbox()];
            case 2:
                isUserExist = _a.sent();
                if (!isUserExist) return [3 /*break*/, 4];
                return [4 /*yield*/, user.registrStuff()];
            case 3:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 5];
            case 4:
                res.sendStatus(403);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.log(error_2);
                res.sendStatus(503);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = userRoutes;
