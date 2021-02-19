"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendMessage = {
    ok: jest
        .fn()
        .mockImplementation(function (projectName, taskName, email) { return ""; }),
    fail: jest
        .fn()
        .mockImplementation(function (projectName, taskName, email) { return ""; }),
};
exports.default = sendMessage;
