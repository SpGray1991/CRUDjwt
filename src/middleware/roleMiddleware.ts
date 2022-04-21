// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'jsonwebtoken' or its correspon... Remove this comment to see the full error message
import jwt from "jsonwebtoken";
import secret from "../config/config.js";
import log from "../config/winston.js";

export default function (roles: any) {
  return function (req: any, res: any, next: any) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      console.log("token", req.headers);
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Пользователь не авторизован" });
      }
      const { roles: userRoles } = jwt.verify(token, secret.secret);
      let hasRole = false;
      userRoles.forEach((role: any) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
        if (!hasRole) {
          return res.status(400).json({ message: "У вас нет доступа" });
        }
      });
      next();
    } catch (e) {
      log.error(e);
      return res.status(400).json({ message: "Пользователь не авторизован" });
    }
  };
}
