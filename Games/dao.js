import model from "./model.js";

export const createGame = async (game) => {
    const emptyGame = {
        origin: '',
        gameName: '',
        image_url: '',
    };
    const existingGame = await model.findOne({ gameName: game.gameName });
    if (existingGame) {
        return model.updateOne({ gameName: game.gameName }, { $set: game });
    } else {
        return model.create({...emptyGame, ...game});
    }
}


export const findAllGames = () => model.find();
export const findGameByGameName = (gameName) =>  model.findOne({ gameName: gameName });
