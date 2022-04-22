import { Router } from "express";
import controller from "./authController";
import { check } from "express-validator";
/* import authMiddleware from "./middleware/authMiddleware.js"; */
import roleMiddleware from "./middleware/roleMiddleware";

const router = Router();

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
