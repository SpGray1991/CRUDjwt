"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = __importDefault(require("./authController.js"));
const express_validator_1 = require("express-validator");
/* import authMiddleware from "./middleware/authMiddleware.js"; */
/* import roleMiddleware from "./middleware/roleMiddleware.js"; */
const router = (0, express_1.Router)();
router.post("/registration", [
    (0, express_validator_1.check)("username", "Имя пользователя не может быть пустым").notEmpty(),
    (0, express_validator_1.check)("password", "Поле пароля должно быть более 4 и менее 10 символов").isLength({ min: 4, max: 10 }),
], authController_js_1.default.registration);
router.post("/login", authController_js_1.default.login);
router.get("/users", /* roleMiddleware(["ADMIN"]), */ authController_js_1.default.getUsers);
router.put("/users", authController_js_1.default.update);
router.delete("/users/:id", authController_js_1.default.delete);
exports.default = router;
//# sourceMappingURL=authRouter.js.map