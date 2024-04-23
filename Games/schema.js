import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
    origin: String,
    gamename: {type: String, unique: true},
    imageurl: String,
  },
  { collection: "games", versionKey: false  });
export default gameSchema;