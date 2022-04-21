// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'jsonwebtoken' or its correspon... Remove this comment to see the full error message
import jwt from "jsonwebtoken";
import secret from "../config/config.js";
import log from "../config/winston.js";

export default function (req: any, res: any, next: any) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, secret.secret);
    req.user = decodedData;
    next();
  } catch (e) {
    log.error(e);
    return res.status(400).json({ message: "Пользователь не авторизован" });
  }
}
