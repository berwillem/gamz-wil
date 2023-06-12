const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}
const verifyTokenAndOwner = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    req.isOwner = false;
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.isOwner = false;
    } else {
      const { id } = req.params;
      const loggedInUserId = user.userId;
      req.isOwner = loggedInUserId === id;
    }
    next();
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAdmin,verifyTokenAndOwner };
