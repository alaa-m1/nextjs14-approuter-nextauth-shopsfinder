import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 60,
  },
  image: {
    type: String,
    default: "/images/user-icon.png",
  },
  accountActivated: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
