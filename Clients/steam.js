import api from 'steam-js-api';

export default function UserRoutes(app) {
    api.setKey(process.env.STEAM_API_KEY);

    const getOwnedGames = async (req, res) => {
        const steamID = req.params.steamID;
        const appID = req.params.appID || null;
        const moreInfo = true;

        try {
            const result = await api.getOwnedGames(steamID, appID, moreInfo);
            res.json(result.data.games);
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Steam API.');
        }
    };

    const getGameSchema = async (req, res) => {
        const appID = req.params.appID;

        try {
            const result = await api.getGameSchema(appID);
            res.json(result.data);
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Steam API.');
        }
    };

    const getAchievements = async (req, res) => {
        const steamID = req.params.steamID;
        const appID = req.params.appID;

        try {
            const result = await api.getAchievements(steamID, appID);
            res.json(result.data);
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Steam API.');
        }
    };

    app.get('/api/games/:steamID/:appID?', getOwnedGames);
    app.get('/api/schema/:appID', getGameSchema);
    app.get('/api/achievements/:steamID/:appID', getAchievements);
}