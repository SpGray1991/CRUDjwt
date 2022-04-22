import { check } from "express-validator";

export default [
  check("username", "Имя пользователя не может быть пустым").notEmpty(),
  check(
    "password",
    "Поле пароля должно быть более 4 и менее 10 символов"
  ).isLength({ min: 4, max: 10 }),
];
