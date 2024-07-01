const Pub = require("../models/pub");

exports.createPub = async (req, res) => {
  try {
    const {
      pub,
      title,
      redirectUrls,
      cardOne,
      cardTwo,
      cardOneImage,
      cardTwoImage,
    } = req.body;
    // Perform data validation on the request payload
    if (!pub || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Delete the existing pub, if it exists
    await Pub.deleteMany();

    // Parse redirectUrls from JSON string to an array of objects
    const parsedRedirectUrls = JSON.parse(redirectUrls);

    // Create the pub data object
    const pubData = new Pub({
      pub: pub,
      title,
      redirectUrls: parsedRedirectUrls,
      cardOne: {
        title: cardOne.title,
        cardOneImage: cardOneImage,
        redirect: cardOne.redirect,
      },
      cardTwo: {
        title: cardTwo.title,
        cardTwoImage: cardTwoImage,
        redirect: cardTwo.redirect,
      },
    });

    const savedPub = await pubData.save();
    res.status(201).json(savedPub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPub = async (req, res) => {
  try {
    const pub = await Pub.findOne();

    if (!pub) {
      return res.status(404).json({ message: "Pub not found" });
    }
    res.set("Cache-Control", "public, max-age=7200");

    res.status(200).json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPubNoCach = async (req, res) => {
  try {
    const pub = await Pub.findOne();

    if (!pub) {
      return res.status(404).json({ message: "Pub not found" });
    }
    res.status(200).json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
