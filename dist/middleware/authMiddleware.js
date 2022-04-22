"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = __importDefault(require("../config/config.js"));
const winston_js_1 = __importDefault(require("../config/winston.js"));
function default_1(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Пользователь не авторизован" });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_js_1.default.secret);
        req.user = decodedData;
        next();
    }
    catch (e) {
        winston_js_1.default.error(e);
        return res.status(400).json({ message: "Пользователь не авторизован" });
    }
}
exports.default = default_1;
//# sourceMappingURL=authMiddleware.js.map