const Sidepub = require("../models/sidepub");

exports.createSidepub = async (req, res) => {
  try {
    const {cardOneImage, cardOneLink, cardTwoImage, cardTwoLink, cloudinaryImage1, cloudinaryImage2} = req.body;
    console.log(cardOneImage, cardOneLink, cardTwoImage, cardTwoLink)
    await Sidepub.deleteMany({});
    const sidepub = new Sidepub({
      image1: {
        url: cloudinaryImage1 ? cloudinaryImage1: cardOneImage.url? cardOneImage.url : cardOneImage,
        redirect: cardOneLink
      },
      image2: {
        url: cloudinaryImage2 ? cloudinaryImage2: cardTwoImage.url ? cardTwoImage.url : cardTwoImage,
        redirect: cardTwoLink
      }
    })
    await sidepub.save();
    
    res.status(200).json(sidepub);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
  }
}

exports.getSidepub = async (req, res) => {
  try {
    const {num} = req.params
    const sidepubs = await Sidepub.findOne({});
    if (!sidepubs) {
      return res.status(404).json({ message: "Sidepub not found" });
    }
    const obj = sidepubs[`image${num}`]
    if (!obj) {
      return res.status(404).json({ message: "Invalid Number" });
    }
    return res.status(200).json(sidepubs[`image${num}`]);
  }catch(err){
    console.error(err)
     return res.status(500).json({ message: err.message });
  }
}