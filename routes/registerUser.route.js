import { User, validateUser } from "../models/users.model.js";
import express from "express";
import hashPassword from "../utils/hash.utils.js";
import _ from "lodash"
const   router = express.Router();

// Handle user registration
router.post("/", async (req, res) => {
  // Validates incoming request body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checks if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // Create new user object if user doesn't exist
  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  // Hash password to ensure sensitive information is stored securely
  user.password = await hashPassword(req.body.password);

  // Save to database
  try {
    await user.save();  // Attempt to save the user
    console.log('User saved successfully!');
  } catch (ex) {
    console.error('Error saving user:', ex);  // Log any errors
    return res.status(500).send('Error saving the user.');
  }

  res.send(_.pick(user, ['name', 'email']));
});

export default router;
