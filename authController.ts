import User from "./models/User";
import Role from "./models/Role";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secret from "./config/config";
import { validationResult } from "express-validator";
import log from "./config/winston";
import { Request, Response } from "express";

const generateAccessToken = (id: string, roles: string) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret.secret, { expiresIn: "48h" });
};

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validate error", errors });
      }

      const { username, password } = req.body;
      const candidate: string = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword: string = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });

      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();
      return res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const username: string = req.body;
      const password: string = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      const validPassword: string = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Введен не верный пароль` });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      log.error(e);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedUser: string = await User.findByIdAndUpdate(
        req.body._id,
        req.body,
        {
          new: true,
        }
      );
      if (!req.body._id) {
        return res.status(400).json({ message: `Введите id` });
      }
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user: string = await User.findByIdAndRemove(req.params.id);
      if (!req.params.id) {
        return res.status(400).json({ message: `Введите id` });
      }
      return res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new authController();
