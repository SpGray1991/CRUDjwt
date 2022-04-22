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
const User_js_1 = __importDefault(require("./models/User.js"));
const Role_js_1 = __importDefault(require("./models/Role.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = __importDefault(require("./config/config.js"));
const express_validator_1 = require("express-validator");
const winston_js_1 = __importDefault(require("./config/winston.js"));
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jsonwebtoken_1.default.sign(payload, config_js_1.default.secret, { expiresIn: "48h" });
};
class authController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Validate error", errors });
                }
                const { username, password } = req.body;
                const candidate = yield User_js_1.default.findOne({ username });
                if (candidate) {
                    return res
                        .status(400)
                        .json({ message: "Пользователь с таким именем уже существует" });
                }
                const hashPassword = bcrypt_1.default.hashSync(password, 7);
                const userRole = yield Role_js_1.default.findOne({ value: "USER" });
                const user = new User_js_1.default({
                    username,
                    password: hashPassword,
                    roles: [userRole.value],
                });
                yield user.save();
                return res.json({ message: "Пользователь успешно зарегистрирован" });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Registration error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_js_1.default.findOne({ username });
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: `Пользователь ${username} не найден` });
                }
                const validPassword = bcrypt_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: `Введен не верный пароль` });
                }
                const token = generateAccessToken(user._id, user.roles);
                return res.json({ token });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Login error" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_js_1.default.find();
                res.json(users);
            }
            catch (e) {
                winston_js_1.default.error(e);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("=====", req.body);
                const updatedUser = yield User_js_1.default.findByIdAndUpdate(req.body._id, req.body, {
                    new: true,
                });
                if (!req.body._id) {
                    return res.status(400).json({ message: `Введите id` });
                }
                return res.json(updatedUser);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_js_1.default.findByIdAndRemove(req.params.id);
                if (!req.params.id) {
                    return res.status(400).json({ message: `Введите id` });
                }
                return res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
}
exports.default = new authController();
//# sourceMappingURL=authController.js.map