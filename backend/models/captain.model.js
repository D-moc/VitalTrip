// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const captainSchema = new mongoose.Schema({
//   fullname: {
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//   },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true, select: false },
//   profileImage: { type: String, default: "" },
// });

// captainSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ _id: this._id, role: "captain" }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
// };

// captainSchema.statics.hashPassword = async (pw) => bcrypt.hash(pw, 10);
// captainSchema.methods.comparePassword = async function (pw) {
//   return bcrypt.compare(pw, this.password);
// };

// export default mongoose.model("Captain", captainSchema);


import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true, trim: true },
      lastname: { type: String, required: true, trim: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

/* -------------------------------------------------------------------------- */
/* 🔑 HASH PASSWORD (Static) */
/* -------------------------------------------------------------------------- */
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

/* -------------------------------------------------------------------------- */
/* 🔑 COMPARE PASSWORD (Instance Method) */
/* -------------------------------------------------------------------------- */
captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* -------------------------------------------------------------------------- */
/* 🧾 GENERATE AUTH TOKEN (JWT) */
/* -------------------------------------------------------------------------- */
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(), // ✅ use `id` instead of `_id` for JWT payload consistency
      role: "captain",
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

/* -------------------------------------------------------------------------- */
/* 🧹 PRE-SAVE HOOK (Auto-hash password if modified) */
/* -------------------------------------------------------------------------- */
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Captain", captainSchema);
