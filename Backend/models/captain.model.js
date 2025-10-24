import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { 
        type: String, 
        required: true, 
        trim: true 
      },
      lastname: { 
        type: String, 
        required: true, 
        trim: true 
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String, 
      required: true, 
      select: false 
    },

    profileImage: {
       type: String, 
       default: "" 
      },

    bio: { 
      type: String, 
      default: "" 
    },

    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { versionKey: false }
);


captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      role: "captain",
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};


captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Captain", captainSchema);
