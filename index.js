import express from "express";
import mongoose from "mongoose";
import router from "./authRouter.js";

const PORT = 6000;
const DB_URL = `mongodb+srv://Gray1991:z1x2c3v4@cluster0.b0ose.mongodb.net/auth_roles?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use("/auth", router);

async function start() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
