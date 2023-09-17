// Middleware for roomAdmin
const checkRoomAdmin = (req, res, next) => {
  const user = req.user; // Assuming you attach the user to the request object
  if (user && user.role === "roomAdmin") {
    // User has the "roomAdmin" role, allow access
    next();
  } else {
    // User does not have the required role, deny access
    res.status(403).json({ error: "Access denied. You must be a roomAdmin." });
  }
};

// Middleware for roomCohost
const checkRoomCohost = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "roomCohost") {
    // User has the "roomCohost" role, allow access
    next();
  } else {
    // User does not have the required role, deny access
    res.status(403).json({ error: "Access denied. You must be a roomCohost." });
  }
};

// Middleware for joinerRoom
const checkJoinerRoom = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "joinerRoom") {
    // User has the "joinerRoom" role, allow access
    next();
  } else {
    // User does not have the required role, deny access
    res.status(403).json({ error: "Access denied. You must be a joinerRoom." });
  }
};
