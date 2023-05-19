const Pub = require("../models/pub");

exports.createPub = async (req, res) => {
  try {
    const { pub, title } = req.body;
    console.log("the log:::",req.body);

    // Perform data validation on the request payload
    if (!pub || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save the pub data to the database
    const pubData = new Pub({ pub, title });
    const savedPub = await pubData.save();

    res.status(201).json(savedPub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};