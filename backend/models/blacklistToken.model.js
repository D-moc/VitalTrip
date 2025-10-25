// models/blacklistToken.model.js
import mongoose from "mongoose";

/**
 * Blacklist Token Schema
 * Used to invalidate JWTs after logout
 */
const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // auto delete after 24 hours (1 day)
    },
  },
  { timestamps: true }
);

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema);
export default blacklistTokenModel;
