import mongoose from "mongoose";

const majorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    indexes: [{ key: { code: 1 }, unique: true }],
  }
);

export default mongoose.model("Major", majorSchema);
