import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    textReview: {
      type: String,
      required: true,
    },
    dataForReview: {
      type: Array,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
