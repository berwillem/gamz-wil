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
    console.log("the log:::", req.body);

    // Perform data validation on the request payload
    if (!pub || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Delete the existing pub, if it exists
    await Pub.deleteMany();

    // Create an array of pub items with publicId included
    const pubItems = pub.map((item) => ({
      url: item.url,
      publicId: item.publicId,
    }));

    // Create the pub data object
    const pubData = new Pub({
      pub: pubItems,
      title,
      redirectUrls,
      cardOne: {
        title: cardOne.title,
        cardOneImage,
        redirect: cardOne.redirect,
      },
      cardTwo: {
        title: cardTwo.title,
        cardTwoImage,
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
    // Find the pub document
    const pub = await Pub.findOne();

    if (!pub) {
      return res.status(404).json({ message: "Pub not found" });
    }

    res.status(200).json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
