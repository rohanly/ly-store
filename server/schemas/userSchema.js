import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  slackId: { type: Schema.Types.String },
  name: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  contactNumber: { type: Schema.Types.Number },
  password: { type: Schema.Types.String },
  profilePic: { type: Schema.Types.String },
  team: { type: Schema.Types.String, enum: ["red", "green", "blue"] },
  role: { type: Schema.Types.String, default: "user", enum: ["user", "admin"] },
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

const user = model("user", userSchema);

export default user;