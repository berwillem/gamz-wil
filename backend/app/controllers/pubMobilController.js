const pubmobil = require("../models/pubmobil");

const arrayify = (input) => {
  if(Array.isArray(input)){
    return input
  }else{
    return [input]
  }
}

exports.createPubMobil = async (req, res) => {
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
    await pubmobil.deleteMany();

    // Parse redirectUrls from JSON string to an array of objects
    // const parsedRedirectUrls = JSON.parse(redirectUrls);

    // Create the pub data object
    const pubData = new pubmobil({
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

exports.getPubMobil = async (req, res) => {
  try {
    const pub = await pubmobil.findOne();
    if (!pub) {
      return res.status(404).json({ message: "Pub not found" });
    }
    res.set("Cache-Control", "public, max-age=7200");
    res.status(200).json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPubMobilNoCach = async (req, res) => {
  try {
    const pub = await pubmobil.findOne();
    if (!pub) {
      return res.status(404).json({ message: "Pub not found" });
    }
    res.status(200).json(pub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
