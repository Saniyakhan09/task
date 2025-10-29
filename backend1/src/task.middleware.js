
// middleware/verifyadmin.js
const jwt = require("jsonwebtoken");

function verifyadmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.Jwt_Secret);
    req.admin = decoded;
    console.log("Admin from token:", decoded);

    next();
  } catch (err) {
    return res.status(401).json({ message: `Invalid token: ${err.message}` });
  }
}

module.exports = verifyadmin;

