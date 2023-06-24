const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const { sendError } = require("../helpers/error");
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
const sessionMiddleware = async (req, res, next) => {
  try {
    // Extract the session identifier from the request headers or query parameters
    const sessionId = req.headers["session-id"] || req.query.sessionId;

    if (!sessionId) {
      return sendError(res, "Session ID is missing!");
    }

    // Find the session in the database
    const session = await Session.findOne({ sessionId });

    if (!session) {
      return sendError(res, "Invalid session!");
    }
    // Check if the session has expired
    if (session.expiresAt < Date.now()) {
      return sendError(res, "Session has expired!");
    }
    // Attach the session and user information to the request object
    req.session = session;
    req.user = {
      userId: session.userId,
      isAdmin: session.isAdmin,
    };

    next();
  } catch (error) {
    console.error("Session middleware error:", error);
    return sendError(res, "Internal server error");
  }
};

module.exports = { verifyToken, sessionMiddleware, verifyTokenAndOwner };
