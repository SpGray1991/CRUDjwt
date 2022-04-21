// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mongoose' or its corresponding... Remove this comment to see the full error message
import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export default mongoose.model("User", User);
