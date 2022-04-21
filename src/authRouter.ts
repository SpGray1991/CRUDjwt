// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'express' or its corresponding ... Remove this comment to see the full error message
import { Router } from "express";
import controller from "./authController.js";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'express-validator' or its corr... Remove this comment to see the full error message
import { check } from "express-validator";
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Поле пароля должно быть более 4 и менее 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.put("/users", controller.update);
router.delete("/users/:id", controller.delete);

export default router;
