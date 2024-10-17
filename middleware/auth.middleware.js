import jwt from "jsonwebtoken";
import { jwtPrivateKey } from "../const.js"

function auth(req, res, next) {
  const token = req.header("x-login-token");
  // Checks if token is provided
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    // Decodes token
    const decoded = jwt.verify(token, jwtPrivateKey);
    // Sets payload to be passed on
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export default auth;
