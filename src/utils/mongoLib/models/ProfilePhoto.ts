import { UserPhoto } from "@/types";
import mongoose from "mongoose";

type ProfilePhotoSchemaType = UserPhoto & {
  userId: string;
};

const ProfilePhotoSchema = new mongoose.Schema<ProfilePhotoSchemaType>(
  {
    userId: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfilePhoto =
  mongoose.models.ProfilePhoto ||
  mongoose.model<ProfilePhotoSchemaType>("ProfilePhoto", ProfilePhotoSchema);

export default ProfilePhoto;
