import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Photo = mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);

export default Photo;
