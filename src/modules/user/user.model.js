import mongoose from "mongoose";
import { RoleEnum } from "../../common/constants/enums.js";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      required: true,
      default: RoleEnum.STUDENT,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    schoolYear: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    majorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major",
    },
    studentId: {
      type: String,
      unique: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    indexes: [
      { key: { email: 1 }, unique: true },
      { key: { username: 1 }, unique: true },
      { key: { studentId: 1 }, unique: true, sparse: true },
      { key: { majorId: 1 } },
    ],
  }
);

export default mongoose.model("User", userSchema);
