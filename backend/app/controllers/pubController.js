const Pub = require("../models/pub");

exports.createPub = async (req, res) => {
  try {
    const {
      pub,
      title,
      links,
      cardOneTitle,
      cardOneLink,
      cardTwoTitle,
      cardTwoLink,
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

    // Create the pub data object
    console.log(links);
    const pubData = new Pub({
      pub: pub,
      title,
      redirectUrls: Array.isArray(links) ? links.map(link=>{url:link}): {url:links},
      cardOne: {
        title: cardOneTitle,
        cardOneImage: cardOneImage,
        redirect: cardOneLink,
      },
      cardTwo: {
        title: cardTwoTitle,
        cardTwoImage: cardTwoImage,
        redirect: cardTwoLink,
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
