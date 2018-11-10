import mongoose, { Schema } from "mongoose";

const groupSchema = Schema({
  activeGroupId: String,
  activatedAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model("activeGroup", groupSchema);
