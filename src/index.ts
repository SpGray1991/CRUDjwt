// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'express' or its corresponding ... Remove this comment to see the full error message
import express from "express";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mongoose' or its corresponding... Remove this comment to see the full error message
import mongoose from "mongoose";
import router from "./authRouter.js";
import log from "./config/winston.js";

const PORT = 5000;
const DB_URL = `mongodb+srv://Gray1991:z1x2c3v4@cluster0.b0ose.mongodb.net/auth_roles?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use("/auth", router);

async function start() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => log.info(`Server started on ${PORT}`));
  } catch (e) {
    log.error(e);
  }
}

start();
