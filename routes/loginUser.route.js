import { User } from "../models/users.model.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login user
router.post("/", async (req, res) => {
  // Validates incoming request body
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checks if user doesn't exist
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // Decrypt and compare password
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res.status(400).send("Invalid email or password");

  // Generate jwt token
  const token = jwt.sign({ _id: user._id }, "privateKey");

  // If login is valid send token
  res.send(token);
});

function validateLogin(req) {
  const errors = [];

  // Email validation
  if (!req.email) {
    errors.push({ message: "Email is required" });
  } else if (req.email.length <= 1 || req.email.length >= 255) {
    errors.push({ message: "Email must be 1 and 255 characters long" });
  }

  // Password validation
  if (!req.password) {
    errors.push({ message: "Password is required" });
  } else if (req.password.length >= 6 || req.password.length <= 255) {
    errors.push({ message: "Password must be 6 and 255 characters long" });
  }

  // Error reporting
  if (errors.length > 0) {
    return {
      error: {
        details: errors,
      },
    };
  }
}

export default router;
