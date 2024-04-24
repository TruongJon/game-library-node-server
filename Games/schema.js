import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
    origin: String,
    gamename: String,
    imageurl: String,
  },
  { collection: "games", versionKey: false  });
export default gameSchema;