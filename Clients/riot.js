import { Client } from 'shieldbow';

const client = new Client(process.env.LEAGUE_API_KEY);
client
    .initialize({
        region: 'na',
    })
    .then(async () => {
        const summoner = await client.summoners.fetchBySummonerName('iyamsushi');
        const leagueEntry = await summoner.fetchLeagueEntries();
        const championMastery = summoner.championMastery;
        const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
        const flexQ = leagueEntry.get('RANKED_FLEX_SR');
        const highest = await championMastery.highest();
        console.log(`Summoner name: ${ summoner.name }(level: ${ summoner.level }).`);
        console.log(`SoloQ: ${ soloQ.tier } ${ soloQ.division }(${ soloQ.lp } LP).`);
        console.log(`FlexQ: ${ flexQ.tier } ${ flexQ.division }(${ flexQ.lp } LP).`);
        console.log(`Highest champion mastery: ${ highest.champion.name }(M${ highest.level } ${ highest.points } points).`);
    });