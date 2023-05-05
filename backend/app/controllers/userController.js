const User = require("../models/User");
// delete user ::::
exports.deleteUserByUsername = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

// get all users  :::
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

// get user by ID:
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};


//  update user

exports.updateUser = async (req, res) => {
  const { avatar, banner, username, nom, prenom, genre, dateNaissance,adress,id } =
    req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }

      user.username = username;
    } else if (username && username === user.username) {
      return res.status(400).json({ error: "New username must be different" });
    }

    if (nom) {
      user.nom = nom;
    }
    if (adress) {
      user.adress = adress;
    }
    if (prenom) {
      user.prenom = prenom;
    }

    if (genre) {
      user.genre = genre;
    }

    if (dateNaissance) {
      user.dateNaissance = dateNaissance;
    }

    if (avatar) {
      user.avatar.url = avatar.url;
      user.avatar.public_id = avatar.public_id;
    }

    if (banner) {
      user.banner.url = banner.url;
      user.banner.public_id = banner.public_id;
    }

    user.infoUpdate = true;

    user = await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
