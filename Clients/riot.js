import { Client } from 'shieldbow';

export default function RiotRoutes(app) {
    const client = new Client(process.env.LEAGUE_API_KEY);
    client.initialize({ region: 'na' });

    const getSummoner = async (req, res) => {
        const summonerName = req.params.summonerName;

        try {
            const summoner = (await client.summoners.fetchBySummonerName(summonerName));
            res.json({
                summonerName: summoner.name,
                summonerLevel: summoner.level,
                summonerIcon: summoner.profileIcon
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Riot API.');
        }
    };

    const getSoloQ = async (req, res) => {
        const summonerName = req.params.summonerName;

        try {
            const summoner = await client.summoners.fetchBySummonerName(summonerName);
            const leagueEntry = await summoner.fetchLeagueEntries();
            const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
            res.json({
                tier: soloQ.tier,
                division: soloQ.division,
                lp: soloQ.lp
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Riot API.');
        }
    };

    const getFlexQ = async (req, res) => {
        const summonerName = req.params.summonerName;

        try {
            const summoner = await client.summoners.fetchBySummonerName(summonerName);
            const leagueEntry = await summoner.fetchLeagueEntries();
            const flexQ = leagueEntry.get('RANKED_FLEX_SR');
            res.json({
                tier: flexQ.tier,
                division: flexQ.division,
                lp: flexQ.lp
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Riot API.');
        }
    };

    const getHighestMastery = async (req, res) => {
        const summonerName = req.params.summonerName;
    
        try {
            const summoner = await client.summoners.fetchBySummonerName(summonerName);
            const championMastery = summoner.championMastery;
            const highest = await championMastery.fetchTop(5);
            res.json({
                first: {
                    name: highest[0].champion.name,
                    level: highest[0].level,
                    points: highest[0].points
                },
                second: {
                    name: highest[1].champion.name,
                    level: highest[1].level,
                    points: highest[1].points
                },
                third: {
                    name: highest[2].champion.name,
                    level: highest[2].level,
                    points: highest[2].points
                },
                fourth: {
                    name: highest[3].champion.name,
                    level: highest[3].level,
                    points: highest[3].points
                },
                fifth: {
                    name: highest[4].champion.name,
                    level: highest[4].level,
                    points: highest[4].points
                }
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('An error occurred while fetching data from the Riot API.');
        }
    };
    
    app.get('/api/summoner/:summonerName', getSummoner);
    app.get('/api/soloq/:summonerName', getSoloQ);
    app.get('/api/flexq/:summonerName', getFlexQ);
    app.get('/api/mastery/:summonerName', getHighestMastery);
}