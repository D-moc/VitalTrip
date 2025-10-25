import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  profileImage: { type: String, default: "" },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: "user" }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

userSchema.statics.hashPassword = async (password) => bcrypt.hash(password, 10);
userSchema.methods.comparePassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
