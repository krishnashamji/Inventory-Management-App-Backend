import { User } from "../models/users.model.js";
import express from "express";
import hashPassword from "../utils/hash.utils.js";
import _ from "lodash";
const router = express.Router();
import bcrypt from "bcrypt";
import Joi from "joi";
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
  const validatePassword = await bcrypt.compare(req.body.password, user.password);
  if(!validatePassword) return res.status(400).send("Invalid email or password");

  // Generate jwt token
  const token = jwt.sign({ _id: user._id }, 'privateKey')

  // If login is valid send token
  res.send(token);
});

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(1).max(255).required(),
  });
  return schema.validate(req);
}
 
export default router;
