import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    schoolYear: { type: String, required: true },
    majorId: { type: Schema.Types.ObjectId, ref: "Major" },
    studentId: { type: Schema.Types.ObjectId, ref: "Class" },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("User", userModel);
