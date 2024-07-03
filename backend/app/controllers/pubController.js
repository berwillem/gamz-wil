const Pub = require("../models/pub");

const arrayify = (input) => {
  if(Array.isArray(input)){
    return input
  }else{
    return [input]
  }
}

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
      cloudinaryPub,
      cloudinaryImage1,
      cloudinaryImage2
    } = req.body;
    // Perform data validation on the request payload
    if (!pub || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Delete the existing pub, if it exists
    await Pub.deleteMany();
    // const cloudinaryPubArr = Array.isArray(cloudinaryPub)? cloudinaryPub : [cloudinaryPub];
    // Parse redirectUrls from JSON string to an array of objects

    // Create the pub data object

    // console.log("image1 :", cloudinaryImage1 ? {url:cloudinaryImage1, publicId:"pubs/o77ehcb92vfj7lhb6f9h"} :cardOneImage)
    // console.log("image2: ",cloudinaryImage2 ? {url:cloudinaryImage2, publicId:"pubs/o77ehcb92vfj7lhb6f9h"} :cardTwoImage)
    console.log("CloudinaryPub: ", (arrayify(cloudinaryPub).map(p=>({url:p}))))
    // console.log(links);
    const pubData = new Pub({
      pub: cloudinaryPub ? [...(arrayify(cloudinaryPub).map(p=>({url:p}))),...(arrayify(pub))] : arrayify(pub),
      title,
      redirectUrls: Array.isArray(links) ? links.map(link=>({url:link})): [{url:links}],
      cardOne: {
        title: cardOneTitle,
        cardOneImage: cloudinaryImage1 ? {url:cloudinaryImage1, publicId:"512"} :cardOneImage,
        redirect: cardOneLink,
      },
      cardTwo: {
        title: cardTwoTitle,
        cardTwoImage: cloudinaryImage2 ? {url:cloudinaryImage2, publicId:"512"} :cardTwoImage,
        redirect: cardTwoLink,
      },
    });

    const savedPub = await pubData.save();
    res.status(201).json(savedPub);
  } catch (err) {
    console.error(err)
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
