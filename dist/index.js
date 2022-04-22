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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_js_1 = __importDefault(require("./authRouter.js"));
const winston_js_1 = __importDefault(require("./config/winston.js"));
const PORT = 5000;
const DB_URL = `mongodb+srv://Gray1991:z1x2c3v4@cluster0.b0ose.mongodb.net/auth_roles?retryWrites=true&w=majority`;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", authRouter_js_1.default);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DB_URL);
            app.listen(PORT, () => winston_js_1.default.info(`Server started on ${PORT}`));
        }
        catch (e) {
            winston_js_1.default.error(e);
        }
    });
}
start();
//# sourceMappingURL=index.js.map