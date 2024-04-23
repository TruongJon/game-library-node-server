import api from 'steam-js-api';

export default function SteamRoutes(app) {
    api.setKey(process.env.STEAM_API_KEY);

    const getOwnedGames = async (req, res) => {
        const steamID = req.params.steamID;
        const appID = req.params.appID || null;
        const moreInfo = true;

        try {
            const result = await api.getOwnedGames(steamID, appID, moreInfo);
            const games = result.data.games;

            for (const game of games.slice(0, 5)) {
                try {
                    const allAchievements = await api.getAchievements(steamID, game.appID);
                    const unlockedAchievements = Object.entries(allAchievements.data.achievements).filter(achievement => achievement[1].unlocked);
                    game.achievements = unlockedAchievements;
                } catch (err) {
                    console.error(`An error occurred while fetching achievements for game ${game.appID}: ${err}`);
                    continue;
                }
            }

            res.json(games);
        } catch (err) {
            console.error(err);
            // res.status(400).send('An error occurred while fetching data from the Steam API.');
        }
    };

    app.get('/api/games/:steamID', getOwnedGames);
}