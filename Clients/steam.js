import { api } from 'steam-js-api';

api.setKey(process.env.STEAM_API_KEY);
const steamID = "76561198050649379";
var appID = null;
const moreInfo = true;

// get games for a user
api.getOwnedGames(steamID, appID, moreInfo).then(result => {
    console.log(result.data.games)
}).catch(console.error)

// game schema returns a list of all achievements and icons for a game,
// need to match them with getAchievements from the player
appID = 221910;
api.getGameSchema(appID).then(result => {
    console.log(result.data)
}).catch(console.error)

api.getAchievements(steamID, appID).then(result => {
    console.log(result.data)
}).catch(console.error)