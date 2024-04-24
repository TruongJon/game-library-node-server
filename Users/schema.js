import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayname: String,
    avatar: String,
    bio: String,
    riotid: String,
    steamid: String,
    following: [ String ],
    likes: [ String ],
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",},
  },
  { collection: "users", versionKey: false  });
export default userSchema;