import model from "./model.js";

export const createGame = async (game) => {
    delete game.gameName;
    delete game._id;
    const emptyGame = {
        origin: '',
        gameName: '',
        image_url: '',
    };
    return model.create({...emptyGame, ...game});
}

export const findAllGames = () => model.find();
export const findGameByGameName = (gameName) =>  model.findOne({ gameName: gameName });
