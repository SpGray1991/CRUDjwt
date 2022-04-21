// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'winston' or its corresponding ... Remove this comment to see the full error message
import winston from "winston";

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
    level: "info",
  }),
];

const Logger = winston.createLogger({
  /*  level: level(), */
  /* levels, */
  format,
  transports,
});

export default Logger;
