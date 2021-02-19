"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var taskNameHuman = {
    ecommerce: "Стандартыне операции для интернет магазина",
    loyaltyOffline: "Операции для ПЛ на кассе",
    loyaltyOnline: "Операции для ПЛ на сайте",
    mobilePush: "Стандратная интеграция мобильного приложения",
};
var sendMessage = {
    ok: function (projectName, taskName, email) {
        return axios_1.default.post("https://api.mindbox.ru/v3/operations/async?endpointId=" + process.env.ENDPOINT + "&operation=QuickStart.SendSuccessStatus", {
            customer: {
                email: email,
            },
            emailMailing: {
                customParameters: {
                    Task: taskNameHuman[taskName],
                    TaskProjectName: projectName,
                    StandardNotificationParameters: {
                        ProjectName: "",
                    },
                    ExportTask: {
                        ResultUrl: "",
                    },
                },
            },
        }, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
                Authorization: "Mindbox secretKey=\"" + process.env.SECRET_KEY + "\"",
            },
        });
    },
    fail: function (projectName, taskName, email) {
        return axios_1.default.post("https://api.mindbox.ru/v3/operations/async?endpointId=" + process.env.ENDPOINT + "&operation=QuickStart.SendErrorStatus", {
            customer: {
                email: email,
            },
            emailMailing: {
                customParameters: {
                    Task: taskNameHuman[taskName],
                    TaskProjectName: projectName,
                    StandardNotificationParameters: {
                        ProjectName: "",
                    },
                    ExportTask: {
                        ResultUrl: "",
                    },
                },
            },
        }, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
                Authorization: "Mindbox secretKey=\"" + process.env.SECRET_KEY + "\"",
            },
        });
    },
};
exports.default = sendMessage;
