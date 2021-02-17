"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var scenariosRoutes_1 = __importDefault(require("./routes/scenariosRoutes"));
var pagesRoutes_1 = __importDefault(require("./routes/pagesRoutes"));
var app = express_1.default();
dotenv.config();
app.use(bodyParser.json());
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client")));
app.use("/", pagesRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/scenario", scenariosRoutes_1.default);
var port = process.env.PORT || 3000;
exports.server = app.listen(port);
