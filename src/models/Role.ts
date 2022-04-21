// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mongoose' or its corresponding... Remove this comment to see the full error message
import mongoose from "mongoose";

const Role = new mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
});

export default mongoose.model("Role", Role);
