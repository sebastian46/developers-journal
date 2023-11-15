const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from headers or other parts of the request
  const token = req.header("Authorization").replace("Bearer ", "");
  // console.log("Token:", token); // Add this line

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:", decoded); // Add this line
    req.user = { _id: decoded.userId }; // Add the user from the token to the request
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
