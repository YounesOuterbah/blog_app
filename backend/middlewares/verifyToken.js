const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPaylaod = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedPaylaod;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token, access denied" });
    }
  } else {
    return res.status(401).json({ message: "no token provided, access denied" });
  }
}

module.exports = { verifyToken };
