import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("GameModel", schema);
export default model;