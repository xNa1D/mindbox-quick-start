"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var checkTocken_1 = __importDefault(require("../helpers/checkTocken"));
var pagesRoutes = express_1.Router();
pagesRoutes.get("/", function (req, res) {
    try {
        checkTocken_1.default(req.cookies.token || "");
        res.redirect("/scenario");
    }
    catch (error) {
        console.log(error);
        res.sendFile(path_1.default.resolve(__dirname, "../../client/login.html"));
    }
});
pagesRoutes.get("/registration", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/reg.html"));
});
pagesRoutes.get("/scenario", function (req, res) {
    try {
        checkTocken_1.default(req.cookies.token || "");
        res.sendFile(path_1.default.resolve(__dirname, "../../client/scenario.html"));
    }
    catch (error) {
        console.log(error);
        res.redirect("/");
    }
});
exports.default = pagesRoutes;
