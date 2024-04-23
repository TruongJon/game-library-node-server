import * as dao from "./dao.js";
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  
  const updateUser = async (req, res) => {
    const status = await dao.updateUser(req.params.username, req.body);
    const currentUser = await dao.findUserByUsername(req.params.username);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.username);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.username);
    const userCopy = JSON.parse(JSON.stringify(user));
    delete userCopy.password;
    res.json(userCopy);
  };

  const searchUsername = async (req, res) => {
    const currentUser = await dao.findUserByUsername(req.params.username);
    const user = await dao.searchUsername(
      req.params.searchString,
      [...currentUser.following, currentUser.username]
    );
    const userList = await user.map(async (person) => {
      const avatar = (
        await dao.findUserByUsername(person.username)
      ).avatar;
      return { username: person.username, avatar: avatar };
    });
    res.json(await Promise.all(userList));
  };

  const findFollowing = async (req, res) => {
    const currentUser = await dao.findUserByUsername(req.params.username);
    const following = currentUser.following;
    const followingList = await following.map(async (person) => {
      const avatar = (await dao.findUserByUsername(person)).avatar;
      return { username: person, avatar: avatar };
    });
    res.json(await Promise.all(followingList));
  };

  const followUser = async (req, res) => {
    const { username, followingUsername } = req.params;
    const user = await dao.findUserByUsername(username);
    const status = await dao.updateUser(user._id, {
      ...user._doc,
      following: [...user.following, followingUsername],
    });
    res.send(status);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  app.post("/api/users", createUser);
  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:username", deleteUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:username", findUserByUsername);
  app.get("/api/users/search/:username/:searchString", searchUsername);
  app.get("/api/users/:username/following", findFollowing);
  app.put("/api/users/:username/:followingUsername", followUser);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
}
