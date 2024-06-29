const User = require("../models/User");
const Post = require("../models/Post");
// delete user ::::
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    await Post.deleteMany({ author: req.params.id });
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

// get ALL users  :::
exports.getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20;
    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const users = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json({ users, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user by ID:
exports.getUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id).populate({
      path: "posts",
      select: "_id title price category images",
      populate: {
        path: "category",
        select: "_id name",
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isOwner = req.isOwner;
    const userData = {
      ...user.toObject(),
      isOwner: isOwner,
    };

    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

//  update user

exports.updateUser = async (req, res) => {
  const {
    avatar,
    banner,
    username,
    nom,
    prenom,
    genre,
    dateNaissance,
    adress,
    phone,
    id,
  } = req.body;

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
    if (phone) {
      user.phone = phone;
    }

    if (genre) {
      user.genre = genre;
    }

    if (dateNaissance) {
      user.dateNaissance = dateNaissance;
    }

    if (avatar.url) {
      user.avatar.url = avatar.url;
      user.avatar.public_id = avatar.public_id;
    }

    if (banner.url) {
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

// count users:
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user count" });
  }
};
