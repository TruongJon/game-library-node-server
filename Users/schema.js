import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayname: String,
    avatar: String,
    bio: String,
    riotid: String,
    steamid: String,
    following: [ { "username" : String } ],
    likes: [ { "game" : String } ]
  },
  { collection: "users" });
export default userSchema;