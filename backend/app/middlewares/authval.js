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

    if (!session || session.expiresAt < Date.now()) {
      return res.status(401).send("Invalid session!");
    }

    // Attach the user information to the request object
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

const adminAuthMiddleware = async (req, res, next) => {
  const isAdmin = req.headers["is-admin"];

  if (isAdmin === "true") {
    try {
      const sessionId = req.headers["session-id"] || req.query.sessionId;

      if (!sessionId) {
        return sendError(res, "Session ID is missing!");
      }

      const session = await Session.findOne({ sessionId });

      if (!session) {
        return sendError(res, "Invalid session!");
      }

      if (session.expiresAt < Date.now()) {
        return sendError(res, "Session has expired!");
      }

      req.user = {
        userId: session.userId,
        isAdmin: session.isAdmin,
      };

      next();
    } catch (error) {
      console.error("Session middleware error:", error);
      return sendError(res, "Internal server error");
    }
  } else {
    next();
  }
};

module.exports = {
  verifyToken,
  sessionMiddleware,
  verifyTokenAndOwner,
  adminAuthMiddleware,
};
