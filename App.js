import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import SteamRoutes from "./Clients/steam.js";
import RiotRoutes from "./Clients/riot.js";
import GameRoutes from "./Games/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/gamelibrary'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
app.use(session(sessionOptions));  
app.use(express.json());
UserRoutes(app);
SteamRoutes(app);
RiotRoutes(app);
GameRoutes(app);

app.listen(process.env.PORT || 4000);