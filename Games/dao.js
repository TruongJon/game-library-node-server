import model from "./model.js";

export const createGame = async (game) => {
    const emptyGame = {
        origin: '',
        gamename: '',
        image_url: '',
    };
    const existingGame = await model.findOne({ gamename: game.gamename });
    if (existingGame) {
        return model.updateOne({ gamename: game.gamename }, { $set: game });
    } else {
        return model.create({...emptyGame, ...game});
    }
}

export const findAllGames = () => model.find();
export const findGameByGameName = (gamename) =>  model.findOne({ gamename: gamename });
