import model from "./model.js";
export const createUser = (user) => {
    delete user._id
    const defaultUser = {
      bio: `${user.username} has not set a bio yet.`,
      riotid: "",
      steamid: "",
      following: [],
      likes: [],
    };
    return model.create({...defaultUser, ...user});
}
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (username, user) =>  model.updateOne({ username: username }, { $set: user });
export const deleteUser = (username) => model.deleteOne({ username: username });
export const searchUsername = (usernamePartial, following) =>
  model.find({ $and :
    [{username: { $regex: `^${usernamePartial}.*`, $options: "mi" }},
    {username: { $nin: following }}],
  });